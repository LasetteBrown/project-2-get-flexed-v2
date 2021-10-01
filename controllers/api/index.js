const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');


router.use('/workout', workoutRoutes);
router.use('/user', userRoutes);
router.use('/categorie', categoryRoutes);
router.use('/comment', commentRoutes);
router.use('/like', likeRoutes);

module.exports = router;