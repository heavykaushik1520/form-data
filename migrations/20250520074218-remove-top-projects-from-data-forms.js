"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("data_forms", "top_projects");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("data_forms", "top_projects", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
