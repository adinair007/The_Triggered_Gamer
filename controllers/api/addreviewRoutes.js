const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
  router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // const newReview = await Review.create
    // ({
    //   game_title: req.body.game_title,
    //   review: req.body.review,
    //   user_score: req.body.user_score,
    //   review_date: req.body.date_created,
    //   user_id: req.session.user_id,
    // });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const reviewUpdate = await Review.update(
      {
        review_body: req.body.review_body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    const review = reviewUpdate.get({ plain: true });

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
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
      res.status(404).end();
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;