const User = require('./User');
const JobPosts = require('./JobPosts');

User.hasMany(JobPosts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

JobPosts.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, JobPosts };