'use strict';

const { EventImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EventImage.bulkCreate([
      {
        eventId: 1,
        url: 'https://images.unsplash.com/photo-1685161456730-200201620fae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://images.pexels.com/photos/5468268/pexels-photo-5468268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://images.pexels.com/photos/1671014/pexels-photo-1671014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?q=80&w=2511&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://images.unsplash.com/photo-1627483298235-f3bac2567c1c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://images.unsplash.com/photo-1605522508768-f8697d6e8e24?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://images.unsplash.com/photo-1474128670149-7082a8d370ea?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2, 3, 4, 5]}
    }, {});
  }
};
