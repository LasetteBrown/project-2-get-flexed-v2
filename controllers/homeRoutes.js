const router = require("express").Router();
const { User, Comment, Workout, Like, Category } = require("../models");
const withAuth = require("../utils/auth");

// Returns the homepage of the website
router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    userId: req.session.userid,
  });
});

// Returns the workouts page of the website with all workouts displayed
router.get("/workouts", async (req, res) => {
  try {
    const workoutData = await Workout.findAll({ include: [User, Category] });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    res.render("workoutList", {
      workouts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns a page with workouts by category
router.get("/category/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: { category_id: req.params.id },
      include: User,
    });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    res.render("workoutList", {
      workouts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns a page for a specific workout
router.get("/workouts/:id", withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findOne({
      where: { id: req.params.id },
      include: [User, Category],
    });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }

    const commentData = await Comment.findAll({
      where: { workout_id: req.params.id },
      include: User,
    });
    if (!commentData) {
      res.status(404).json({ message: "No comments found" });
      return;
    }

    const workout = workoutData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const likeData = await Like.findAll({
      where: { workout_id: req.params.id },
    });
    const likes = likeData.map((like) => like.get({ plain: true }));
    let postLiked = false;
    await likes.forEach((like) => {
      if (like.user_id == req.session.userId) {
        postLiked = true;
      }
    });
    res.render("workout", {
      workout,
      comments,
      postLiked,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns your profile page
router.get("/profile", withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: { user_id: req.session.userId },
      include: Category,
    });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    const userData = await User.findOne({
      where: { id: req.session.userId },
    });
    if (!userData) {
      res.status(404).json({ message: "No User data found" });
      return;
    }
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    const user = userData.get({ plain: true });
    res.render("profile", {
      workouts,
      user,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns a specific profile page
router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      where: { user_id: req.params.id },
      include: Category,
    });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    const userData = await User.findOne({
      where: { id: req.params.id },
    });
    if (!userData) {
      res.status(404).json({ message: "No User data found" });
      return;
    }
    const user = userData.get({ plain: true });

    res.render("profile", {
      workouts,
      user,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns a likes page with all workouts that a user has liked
router.get("/likes", withAuth, async (req, res) => {
  try {
    const likeData = await Like.findAll({
      where: { user_id: req.session.userId },
    });
    if (!likeData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    const likes = likeData.map((like) => like.get({ plain: true }));
    let workoutId = []
    likes.forEach(element => workoutId.push(element.workout_id));
    const workoutData = await Workout.findAll({where: {id: workoutId}, include: [Category, User]})
    const workouts = workoutData.map((workout) => workout.get({plain:true}))
    console.log(workouts);
    res.render("likedWorkouts", {
      workouts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a workout page
router.get("/create", withAuth, (req, res) => {
  res.render("create", {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

// Edit page for workouts
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.findOne({
      where: { id: req.params.id },
      include: [User, Category],
    });

    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }

    const workout = workoutData.get({ plain: true });

    res.render("edit", {
      workout,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
