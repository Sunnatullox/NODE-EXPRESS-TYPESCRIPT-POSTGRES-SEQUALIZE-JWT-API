'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface UserAtubutes{
  id: String,
  name: String,
  email:String,
  password: String,
  avatar: String
}


module.exports = (sequelize:any, DataTypes:any) => {

  class user extends Model<UserAtubutes> 

    implements UserAtubutes{

    

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id! :string;
    name!: string;
    email!: string;
    password!: string;
    avatar!:string;
    
    static associate(models:any) {
      // define association here
      user.belongsToMany(models.Project,{
        through:'ProjectAssignments'
      })
    }
  }
  user.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull:false,
      primaryKey:true,

    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    avatar:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};