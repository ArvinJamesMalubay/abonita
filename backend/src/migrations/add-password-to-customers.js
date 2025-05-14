module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('customers', 'password', {
        type: Sequelize.STRING,
        allowNull: true
      });
      console.log('Added password column to customers table');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding password column to customers table:', error);
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('customers', 'password');
      console.log('Removed password column from customers table');
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing password column from customers table:', error);
      return Promise.reject(error);
    }
  }
}; 