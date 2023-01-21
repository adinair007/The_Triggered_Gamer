const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const reviewRoutes = require('./reviewRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
