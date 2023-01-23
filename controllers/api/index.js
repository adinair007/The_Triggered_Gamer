const router = require('express').Router();
const userRoutes = require('./userRoutes');
const addreviewRoutes = require('./addreviewRoutes');
const gameRoutes = require('./gameRoutes')

router.use('/users', userRoutes);
router.use('/add-review', addreviewRoutes);
router.use('/games', gameRoutes);


module.exports = router;
