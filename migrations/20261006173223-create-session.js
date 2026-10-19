const { DataTypes } = require('sequelize')

module.exports = {
  up : async ({ context:queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      token: {
        type:  DataTypes.STRING
      },
      user_id: {
        type:  DataTypes.INTEGER,
        allowNull:false,
        reference:{ model:'users',key:'id' }
      },
      created_at: {
        allowNull: false,
        type:  DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type:  DataTypes.DATE
      }
    })

    await queryInterface.addColumn('users','disabled',{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
    })
  },
  down: async ({ context:queryInterface }) => {
    await queryInterface.dropTable('sessions')
    await queryInterface.removeCol('users','disabled')
  }
}