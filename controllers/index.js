const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const reviewRoutes = require('./reviewRoutes');
const newReview = require('./newReview')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/review', reviewRoutes);
router.use('/new', newReview);

module.exports = router;
