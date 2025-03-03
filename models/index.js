const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)
Session.belongsTo(User)
User.hasMany(Session)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList })

module.exports = { Blog, User, ReadingList, Session }