'use strict';

const { Group } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        organizerId: 1,
        name: 'Grillin Dads',
        about: 'Just a buncha dads who like to get together and fight over manning the grill',
        type: 'In person',
        private: false,
        city: 'Fairbanks',
        state: 'AK'
      },
      {
        organizerId: 1,
        name: 'Cat Lovers',
        about: 'Lets chat about our cats! I need to get this text to be at least 50 characters ',
        type: 'Online',
        private: false,
        city: 'Los Angeles',
        state: 'CA'
      },
      {
        organizerId: 2,
        name: 'Art Snobs',
        about: 'We got to galleries and thumb our noses at everything. We are the snobbiest and coolest.',
        type: 'In person',
        private: true,
        city: 'Milwaukee',
        state: 'WI'
      },
      {
        organizerId: 3,
        name: 'Desert Walkers',
        about: 'Enjoy the blazing hot sun? Then these walks are for you! Get skin cancer, snake bit and cactus thorned.',
        type: 'In person',
        private: false,
        city: 'Albuquerque',
        state: 'NM'
      },
      {
        organizerId: 4,
        name: 'Midwest History Buffs',
        about: 'We know everything there is to know about history in the heartland. Come on thru and quiz our knowledge! But you did not know Wichita is 5000 years old!',
        type: 'Online',
        private: true,
        city: 'Wichita',
        state: 'KS'
      },
      {
        organizerId: 5,
        name: 'Gator Appreciators',
        about: 'Bring yer guts cause you gon need them on our night swamp walks through the Bayou.',
        type: 'In person',
        private: true,
        city: 'Mobile',
        state: 'AL'
      },
      {
        organizerId: 3,
        name: "Adventure Seekers",
        about: "A group passionate about outdoor adventures and exploration.",
        type: "In person",
        private: false,
        city: "Denver",
        state: "CO"
      },
      {
        organizerId: 7,
        name: "Tech Enthusiasts",
        about: "A community of tech lovers sharing knowledge and experiences.",
        type: "Online",
        private: true,
        city: "San Francisco",
        state: "CA"
      },
      { 
        organizerId: 1,
        name: "Bookworms Club",
        about: "Dedicated to the joy of reading and discussing great books.",
        type: "In person",
        private: false,
        city: "Boston",
        state: "MA"
      },
      {
        organizerId: 9,
        name: "Fitness Fanatics",
        about: "Get fit together with a supportive community committed to a healthy lifestyle.",
        type: "In person",
        private: false,
        city: "Los Angeles",
        state: "CA"
      },
      {
        organizerId: 5,
        name: "Virtual Gaming Crew",
        about: "Connecting gamers worldwide for epic virtual adventures.",
        type: "Online",
        private: true,
        city: "Seattle",
        state: "WA"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Grillin Dads', 'Cat Lovers', 'Art Snobs', 'Desert Walkers', 'Midwest History Buffs', 'Gator Appreciators', "Adventure Seekers", "Tech Enthusiasts", "Bookworms Club", "Fitness Fanatics", "Virtual Gaming Crew"]}
    }, {});
  }
};
