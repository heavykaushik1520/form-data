"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("data_forms", "arc_name", {
      type: Sequelize.STRING,
      allowNull: true, // or false if you want it to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("data_forms", "arc_name");
  },
};
