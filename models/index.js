const User = require('./User');
const Review = require('./Review');
const Games = require('./Games');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// User.hasMany(Games, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

Games.hasMany(Review, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Games.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Games, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Review, Games };
