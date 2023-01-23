const sequelize = require('../config/connection');
const { User, Review, Games } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const gamesData = require('./gamesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const games of gamesData) {
    await Games.create({
      ...games,
    });
  }

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      // game_id: games[Math.floor(Math.random() * games.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
