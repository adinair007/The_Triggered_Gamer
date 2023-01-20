const router = require('express').Router();
const { Review, User, Games } = require('../../models');
const withAuth = require('../../utils/auth');

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

    res.render('review', {
      reviews: reviewData,
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
      res.status(404).render('404', { doesNotExist });
      return;
    }

    res.status(200).json(reviewData);

    const review = reviewData.get({ plain: true });

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      review_body: req.body.review_body,
      review_date: req.body.review_date,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      res.render('review', {
        // pass the data to handlebars
        reviews: newReview,
      });
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const reviewUpdate = await Review.update(
      {
        review_body: req.body.review_body,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.render('review', {
      reviews: reviewUpdate,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewDelete = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewDelete) {
      res.status(404).render('404', { doesNotExist });
      return;
    }

    res.render('review', {
      reviews: reviewDelete,
    });
  } catch (err) {
    res.status(500).render('routeError', { error });
  }
});

module.exports = router;
