const router = require('express').Router();
const { Review, User, Games } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/search', async (req, res) => {
//   try {
//     console.log(req.query);
//     const gamesData = await Games.findOne(
//       { where: { slug: req.query.name } },
//       {
//         include: [
//           {
//             model: Review,
//             attributes: ['id', 'review', 'date_created', 'user_id'],
//           },
//         ],
//       }
//     );
//     if (!gamesData) {
//       axios({
//         method: 'get',
//         url: `https://api.rawg.io/api/games/${req.query.gametitle}?key=${process.env.API_KEY}`,
//       })
//         .then((response) => {
//           let gameInfo = {
//             title: response.data.name,
//             slug: response.data.slug,
//             game_description: response.data.description,
//             release_date: response.data.released,
//             metacritic: response.data.metacritic,
//             background_image: response.data.background_image,
//             gameId: 0,
//           };

//           // save to req session
//           req.session.slug = response.data.slug;

//           console.log(gameInfo);
//           res.json(gameInfo);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       // change to gamesData
//       let gameInfo = {
//         title: gamesData.title,
//         slug: gamesData.slug,
//         game_description: gamesData.description,
//         release_date: gamesData.released,
//         metacritic: gamesData.metacritic,
//         background_image: gamesData.background_image,
//         gameId: gamesData.id,
//       };
//       console.log('something else');
//       res.json(gameInfo);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'user_name'],
        },
        {
          model: Games,
          attributes: ['id', 'name'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('all-reviews', {
      reviews,
    });
  } catch (err) {
    res.status(500).render('routeError', { err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'user_name'],
        },
        {
          model: Games,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!reviewData) {
      res.status(404).render('404');
      return;
    }

    const review = reviewData.get({ plain: true });

    res.render('single-review', {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

module.exports = router;
