const Blog = require('./Blog')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)

const syncModels = async ()=>{
    await Blog.sync();
    await User.sync();
}

module.exports = {
    Blog, User, syncModels
}