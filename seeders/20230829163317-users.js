'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', 
      [
        {
        username: 'jake123',
        password: '12345',
        email: 'jake@yahoo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'sara1995',
        password: '12345',
        email: 'sara@yhotmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'kelly987',
        password: '12345',
        email: 'kelly@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
