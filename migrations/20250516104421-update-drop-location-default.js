'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update existing rows with old default value to the new default value
    await queryInterface.bulkUpdate(
      'data_forms', // table name
      { drop_location: 'Leela Bhartiya City, Bangalore' }, // new value
      { drop_location: 'Default Location' } // condition to find rows to update
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert the change if needed
    await queryInterface.bulkUpdate(
      'data_forms',
      { drop_location: 'Default Location' },
      { drop_location: 'Leela Bhartiya City, Bangalore' }
    );
  }
};
