"use strict";

const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const DataForm = sequelize.define(
    "DataForm",
    {
      firm_name: DataTypes.STRING,
      arc_name: DataTypes.STRING,
      designation: DataTypes.STRING,
      arc_image: DataTypes.STRING,
      arc_quote: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      firm_website: DataTypes.STRING,
      personal_insta: DataTypes.STRING,
      firm_insta: DataTypes.STRING,
      personal_linkedin: DataTypes.STRING,
      firm_linkedin: DataTypes.STRING,
      top_projects: DataTypes.TEXT,
      projects_2025: DataTypes.TEXT,
      pick_up_location: DataTypes.STRING,
      drop_location: {
        type: DataTypes.STRING,
        defaultValue: "Leela Bhartiya City, Bangalore	",
      },
      pick_up_time: DataTypes.DATE, 
      evening_drop_location: DataTypes.STRING
      // vision: DataTypes.STRING
    },
    {
      tableName: "data_forms",
      // paranoid: true,
    }
  );
  DataForm.associate = function (models) {};
  return DataForm;
};
