const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comments extends Model {}

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Comments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workout_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'workout',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comments',
  })