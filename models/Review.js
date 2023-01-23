const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    game_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 0,
      max: 10,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

    // game_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'games',
    //     key: 'id',
    //   },
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
