const router = require('express').Router();
const { Review, User, Games } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
        {
          model: Games,
          attributes: ['name'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));
    console.log('Inside reviews');
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
          attributes: ['user_name'],
        },
        {
          model: Games,
          attributes: ['name'],
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
