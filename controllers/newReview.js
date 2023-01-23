const router = require('express').Router();
const { Review, User, Games } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  res.render('new-review');
});

module.exports = router;
