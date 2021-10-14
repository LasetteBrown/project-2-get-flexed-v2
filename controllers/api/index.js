const router = require("express").Router();
const workoutRoutes = require("./workoutRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const likeRoutes = require("./likeRoutes");

router.use("/workout", workoutRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);

module.exports = router;
