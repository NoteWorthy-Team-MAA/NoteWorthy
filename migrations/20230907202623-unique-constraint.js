"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Users", {
      fields: ["username"],
      type: "unique",
      name: "unique_username_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Users",
      "unique_username_constraint"
    );
  },
};
