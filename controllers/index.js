const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const reviewRoutes = require('./reviewRoutes');
const dashboardRoutes = require('./dashboardRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/review', reviewRoutes);
router.use('/dashboard', dashboardRoutes );

module.exports = router;
