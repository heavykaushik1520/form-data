"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("data_forms", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firm_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arc_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      arc_image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      arc_quote: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firm_website: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      personal_insta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firm_insta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      personal_linkedin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firm_linkedin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      top_projects: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      projects_2025: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pick_up_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      drop_location: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Leela Bhartiya City, Bangalore",
      },
      pick_up_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      evening_drop_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("data_forms");
  },
};
