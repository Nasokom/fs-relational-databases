
const { DataTypes } = require('sequelize')

module.exports = {
  up: async({ context:queryInterface }) => {
    await queryInterface.createTable('users',{
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      name:{
        type:DataTypes.TEXT,
        allowNull:false
      },
      password_hash:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      username:{
        type:DataTypes.TEXT,
        allowNull:false,
        unique:{
          name: 'users_username_unique',
          msg: 'Username is already registered'
        },
        validate:{
          isEmail: { msg:'username must be a valid email address' }
        }
      },
      created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    })


    await queryInterface.createTable('blogs',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{ model:'users',key:'id' }
      },
      created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    })

  },
  down: async({ context:queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}
