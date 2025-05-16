"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, remove the default value using raw SQL (PostgreSQL & MySQL safe)
    await queryInterface.sequelize.query(`
      ALTER TABLE data_forms
      ALTER COLUMN evening_drop_location DROP DEFAULT
    `);

    // Then, make it NOT NULL
    return queryInterface.changeColumn("data_forms", "evening_drop_location", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add default and allow null in down migration
    return queryInterface.changeColumn("data_forms", "evening_drop_location", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Leela Bhartiya City, Bangalore",
    });
  },
};
