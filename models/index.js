const User = require('./User');
const Review = require('./Review');

User.hasMany(Review, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_name'
});

module.exports = { User, Review };
