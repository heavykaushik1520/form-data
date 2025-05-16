"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Update existing NULLs to a fallback value (e.g., "N/A")
    await queryInterface.sequelize.query(`
      UPDATE data_forms
      SET arc_name = 'N/A'
      WHERE arc_name IS NULL
    `);

    // 2. Change column to NOT NULL
    return queryInterface.changeColumn("data_forms", "arc_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to allow null again
    return queryInterface.changeColumn("data_forms", "arc_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
