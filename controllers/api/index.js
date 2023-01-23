const router = require('express').Router();
const userRoutes = require('./userRoutes');
const addreviewRoutes = require('./addreviewRoutes');

router.use('/users', userRoutes);
router.use('/add-review', addreviewRoutes);


module.exports = router;
