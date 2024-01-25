'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {
  tableName: 'Users'
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options, 'profileImageUrl', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'profileImageUrl')
  }
};
