const { Model,DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model {}

Blog.init({
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
  date:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      isValideDate(value) {
        if (value < 1991) {
          throw new Error('Date Should be greater then 1991!')
        }
        if (value > new Date().getFullYear()) {
          throw new Error('Date Shouldnt be greater than the current year!')
        }
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blogs'
})

module.exports = Blog