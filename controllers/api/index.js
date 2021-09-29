const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');


router.use('/workouts', workoutRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);

module.exports = router;