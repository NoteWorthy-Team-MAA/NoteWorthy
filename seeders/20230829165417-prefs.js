'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prefs', 
    [
      {
        theme: 'Dark',
        autoSave: 0,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        theme: 'Light',
        autoSave: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        theme: 'Dark',
        autoSave: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    ], 
    {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prefs', null, {});
     
  }
};
