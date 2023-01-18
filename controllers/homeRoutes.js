const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

//RAWG API CODE
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=25`,
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

router.get('/', async (req, res) => {
  try {
    // Get all Reviews and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
