const Blog = require('./Blog')
const User = require('./user')
const {sequelize} = require('../utils')

Blog.belongsTo(User)
User.hasMany(Blog)

const syncModels = async ()=>{
    await Blog.sync();
    await User.sync({ alter: true });
    await sequelize.sync({ alter: true })
}

module.exports = {
    Blog, User, syncModels
}