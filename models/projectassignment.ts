'use strict';

import { Model } from 'sequelize';


interface ProjectAssignmentAtubutes{
  ProjectId:number,
  userId:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class ProjectAssignment extends Model<ProjectAssignmentAtubutes>
  implements ProjectAssignmentAtubutes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    ProjectId!:number;
    userId!:string;

    static associate(models: any) {
      // define association here
    }
  }
  ProjectAssignment.init({
    ProjectId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Projects',
        key:'id'
      }
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'user',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectAssignment',
  });
  return ProjectAssignment;
};