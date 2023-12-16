'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Demo",
        lastName: "Lition"
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Fake",
        lastName: "User"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Cake",
        lastName: "Snoozer"
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: "Rake",
        lastName: "Cruiser"
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: "Bake",
        lastName: "Loser"
      },
      {
        email: 'user1@example.com',
        username: 'JohnDoe',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'user2@example.com',
        username: 'JaneSmith',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Jane',
        lastName: 'Smith'
      },
      {
        email: 'user3@example.com',
        username: 'ChrisJohnson',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Chris',
        lastName: 'Johnson'
      }, 
      {
        email: 'user4@example.com',
        username: 'Flaker',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Flake',
        lastName: 'Shmoozer'
      }, 
      {
        email: 'user5@example.com',
        username: 'AliceWilliams',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Alice',
        lastName: 'Williams'
      } 
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'JohnDoe', 'JaneSmith', 'ChrisJohnson', 'Flaker', 'AliceWilliams']}
    }, {});
  }
};
