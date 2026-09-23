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
            isEmail: { msg:'username must be a valid email address'}
        }
    }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'users'
})

module.exports= User