const router = require('express').Router();
const { Review, User, Games } = require('../models');
const withAuth = require('../utils/auth');

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

    const reviews = reviewData.map(review => review.get({ plain: true }));

    res.render('review', {
      reviews,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
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

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

module.exports = router;
