const { sequelize } = require('../utils/db')
const { Model,DataTypes } = require('sequelize')

class Session extends Model {}

Session.init({
  id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  token: {
    type:DataTypes.STRING
  },
  userId: {
    type:DataTypes.INTEGER, references:{ model:'users',key:'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'sessions',
})


module.exports = Session