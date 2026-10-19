const { DataTypes } = require('sequelize')

module.exports = {
  up:async({ context:queryInterface }) => {
    await queryInterface.addColumn('blogs','date',{
      type:DataTypes.INTEGER,
      allowNull:true,
      validate:{
        isValideDate(value) {
          if (value < 1991) {
            throw new Error('Date Should be greater then 1991!')
          }
          if (value > new Date().getFullYear()) {
            throw new Error('Date Should be greater then 1991!')
          }
        }
      }
    })
  },
  down: async ({ context:queryInterface }) => {
    await queryInterface.removeColumn('blogs','users')
  }
}