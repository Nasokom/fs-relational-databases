const Blog = require('./Blog')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)



module.exports = {
  Blog, User
}