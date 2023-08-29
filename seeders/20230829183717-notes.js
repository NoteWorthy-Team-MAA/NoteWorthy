'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notes', 
    [
      {
        title: 'My thoughts of today...',
        body: 'Today was actually pretty good. I tried a new recipe I had been wanting to try and it turned out exactly how I wanted',
        category: 'Personal',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        title: 'Terrible Day',
        body: 'HOURS after my dog came home from the groomer he was sprayed in the face by a skunk and smells soooo bad now.',
        category: 'Personal',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        title: 'Work Today',
        body: "I'm being bullied at work!",
        category: 'Professional',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
    ], 
    {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
     
  }
};
