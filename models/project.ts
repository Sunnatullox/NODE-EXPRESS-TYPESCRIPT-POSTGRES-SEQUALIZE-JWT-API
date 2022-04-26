'use strict';

import { Model, Optional } from 'sequelize';

interface ProjectAtubutes{
  id :number,
  title: String,
  status:String,
  url:string,
  }

module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model<ProjectAtubutes> 
  implements ProjectAtubutes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id! :number
     title!: String
     status!:String
     url!:string
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.user, {
        through:'ProjectAssignments'
      })
    }
  }
  Project.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false
    },
    url:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};