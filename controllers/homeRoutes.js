const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

//RAWG API CODE
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const gamesQuery = {
      key: process.env.API_KEY,
      page_size: 25,
    };
    if (req.query.search) {
      gamesQuery.search = req.query.search;
    }
    const response = await axios({
      params: gamesQuery,
      method: 'get',
      url: `https://api.rawg.io/api/games`,
    });

    let gamesData = [];
    const { results } = response.data;
    for (let i = 0; i < results.length; i++) {
      const game = results[i];
      const gameData = await axios.get(
        `https://api.rawg.io/api/games/${game.id}?key=${process.env.API_KEY}`
      );
      let temp = {
        name: gameData.data.name,
        image: gameData.data.background_image,
        metacritic: gameData.data.metacritic,
        description: gameData.data.description,
        released: gameData.data.released,
        id: gameData.data.id,
      };
      gamesData.push(temp);
    }
    res.render('homepage', {
      // pass the data to handlebars
      games: gamesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('routeError', { error });
  }
});

//END RAWG API CODE

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  // If the user is not already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('profile', { name: 'Whats up' }); // TODO
});

module.exports = router;
