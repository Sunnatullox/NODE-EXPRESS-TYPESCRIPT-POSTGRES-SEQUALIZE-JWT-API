'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProjectAssignment extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    ProjectAssignment.init({
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Projects',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'ProjectAssignment',
    });
    return ProjectAssignment;
};
