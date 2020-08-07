'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('historial_compras', {
      id : {
        type : Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey : true,
        autoIncrement : true
      },
      id_carrito : {
        type : Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false,
        references : {
          model : 'carrito',
          key : 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('historial_compras')
  }
};
