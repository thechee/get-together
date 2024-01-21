'use strict';

const { Event } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        venueId: 1,
        groupId: 1,
        name: 'Memorial Day Mayhem',
        type: 'In person',
        capacity: 500,
        price: 0.00,
        description: 'The official opening day of grilling season!!',
        startDate: "2024-05-30 12:00:00",
        endDate: "2024-05-30 20:00:00"
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Cat Chat',
        type: 'Online',
        capacity: 1000,
        price: 2.00,
        description: 'Monthly cat chat, BYOB',
        startDate: "2024-01-01 12:00:00",
        endDate: "2024-01-01 20:00:00"
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'New Exhibit Snobbery',
        type: 'In person',
        capacity: 5,
        price: 100.00,
        description: 'There is a new exhibit at the museum, we are going to make fun of it',
        startDate: "2024-07-30 12:00:00",
        endDate: "2024-07-30 20:00:00"
      },
      {
        venueId: 4,
        groupId: 1,
        name: 'JULY 4th MUERICA DAY',
        type: 'In person',
        capacity: 500,
        price: 10.00,
        description: 'LET THERE BE HOT DOGS AND FREEDOM',
        startDate: "2024-07-04 12:00:00",
        endDate: "2024-07-04 20:00:00"
      },
      {
        venueId: 1,
        groupId: 2,
        name: 'Cat Chat',
        type: 'Online',
        capacity: 1000,
        price: 2.00,
        description: 'Monthly cat chat, BYOB',
        startDate: "2024-02-01 12:00:00",
        endDate: "2024-02-01 20:00:00"
      },
      {
        venueId: null,
        groupId: 8,
        name: 'Tech Talk',
        type: 'Online',
        capacity: 500,
        price: 10.50,
        description: 'Explore the latest in technology trends.',
        startDate: '2024-03-15 14:30:00',
        endDate: '2024-03-15 16:30:00'
      },
      {
        venueId: null,
        groupId: 10,
        name: 'Fitness Fiesta',
        type: 'In Person',
        capacity: 200,
        price: 5.75,
        description: 'Join us for a high-energy workout session.',
        startDate: '2024-04-10 18:00:00',
        endDate: '2024-04-10 20:00:00'
      },
      {
        venueId: null,
        groupId: 9,
        name: 'Book Club Gathering',
        type: 'In Person',
        capacity: 150,
        price: 0.99,
        description: 'Discussing the latest bestsellers.',
        startDate: '2024-05-05 19:00:00',
        endDate: '2024-05-05 21:00:00'
      },
      {
        venueId: null,
        groupId: 11,
        name: 'Virtual Cooking Class',
        type: 'Online',
        capacity: 300,
        price: 15.25,
        description: 'Learn to cook delicious dishes from home.',
        startDate: '2024-06-20 13:00:00',
        endDate: '2024-06-20 15:00:00'
      },
      {
        venueId: null,
        groupId: 3,
        name: 'Art Expo',
        type: 'In Person',
        capacity: 400,
        price: 7.99,
        description: 'Showcasing local artists and their creations.',
        startDate: '2024-07-12 16:00:00',
        endDate: '2024-07-12 19:00:00'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    }, {});
  }
};
