'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if the column already exists
      const tableInfo = await queryInterface.describeTable('Users');
      
      // Add fullName column if it doesn't exist
      if (!tableInfo.fullName) {
        await queryInterface.addColumn('Users', 'fullName', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      // Remove full_name column if it exists
      if (tableInfo.full_name) {
        await queryInterface.removeColumn('Users', 'full_name');
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Check if the column exists before trying to remove it
      const tableInfo = await queryInterface.describeTable('Users');
      
      if (tableInfo.fullName) {
        await queryInterface.removeColumn('Users', 'fullName');
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}; 