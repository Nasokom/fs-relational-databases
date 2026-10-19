const Blog = require('./Blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

// ReadingList.hasMany(Blog)
// User.hasMany(ReadingList)

User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: 'userId',
  otherKey: 'blogId',
  as: 'readings'
})

Blog.belongsToMany(User, {
  through: ReadingList,
  foreignKey: 'blogId',
  otherKey: 'userId',
  as: 'savedBy'
})


module.exports = {
  Blog, User, ReadingList, Session
}