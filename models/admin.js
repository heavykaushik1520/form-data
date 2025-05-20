"use strict";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      admin_name: DataTypes.STRING,
      admin_email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      tableName: "admins_showgrid",
      // paranoid: true,
    }
  );
  Admin.associate = function (models) {};
  return Admin;
};