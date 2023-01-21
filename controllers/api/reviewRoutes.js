const router = require('express').Router();
const { Review } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      review_body: req.body.review_body,
      review_date: req.body.review_date,
      // user_id: req.session.user_id,
    });

    req.status(200).json(newReview);
  } catch (err) {
    res.status(500).json(error);
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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
});
