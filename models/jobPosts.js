const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class JobPosts extends Model {}

JobPosts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    job_qualifications: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    job_location: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobPosts',
  }
);

module.exports = JobPosts;