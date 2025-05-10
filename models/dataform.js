"use strict";

const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const DataForm = sequelize.define(
    "DataForm",
    {
      firm_name: DataTypes.STRING,
      arc_name: DataTypes.STRING,
      arc_image: DataTypes.STRING,
      arc_quote: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      firm_website: DataTypes.STRING,
      firm_insta: DataTypes.STRING,
      firm_linkedin: DataTypes.STRING,
      top_projects: DataTypes.JSON,
      projects_2025: DataTypes.JSON,
      pick_up_location: DataTypes.STRING,
      drop_location: DataTypes.STRING,
      pick_up_time: DataTypes.DATE,
    },
    {
      tableName: "data_forms",
      // paranoid: true,
    }
  );
  DataForm.associate = function (models) {};
  return DataForm;
};
