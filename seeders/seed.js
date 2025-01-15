'use strict';
const bcrypt = require('bcrypt'); // Untuk hashing password

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123456', 10); // Hash password "123456"

    return queryInterface.bulkInsert('Employees', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword, // Password yang sudah di-hash
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employee',
        email: 'employee@gmail.com',
        password: hashedPassword, // Password yang sudah di-hash
        role: 'employee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', {
      email: {
        [Sequelize.Op.in]: ['admin@gmail.com', 'employee@gmail.com'],
      },
    });
  },
};
