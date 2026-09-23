const {sequelize} = require('../utils.js')
const {Model, DataTypes} = require('sequelize')

class User extends Model{}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    },
      passwordHash:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    username:{
        type:DataTypes.TEXT,
        allowNull:false
    }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'users'
})

module.exports= User