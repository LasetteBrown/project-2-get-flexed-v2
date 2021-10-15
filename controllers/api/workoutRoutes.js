const router = require("express").Router();
const { Workout, User, Comment, Category } = require("../../models");

// Get all workouts
router.get("/", async (req, res) => {
  try {
    // Get all workouts with user, comments, and category
    const workoutData = await Workout.findAll({
      include: User,
      Comment,
      Category,
    });

    // Checks to make sure data came back
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }

    // Response with the workout data
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a workout
router.post("/", async (req, res) => {
  try {
    // Sets the user id of the new workout equal to the sessions user id
    req.body.user_id = req.session.userId;

    // If the title or description is a empty string, then it is set equal to null
    if (req.body.title == "") {
      req.body.title = null;
    }
    if (req.body.description == "") {
      req.body.description = null;
    }

    // Creates the workout with the req.body
    const workoutData = await Workout.create(req.body);

    // 200 Status saying the workout was created
    res.status(200).json({ workoutData, message: "Workout created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates a workout
router.put("/:id", async (req, res) => {
  try {
    // Sets the user id of the new workout equal to the sessions user id
    req.body.user_id = req.session.userId;

    // If the title or description is a empty string, then it is set equal to null
    if (req.body.title == "") {
      req.body.title = null;
    }
    if (req.body.description == "") {
      req.body.description = null;
    }
    // Updates the workout in the database where the workout id's match
    const workoutData = await Workout.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ workoutData, message: "Workout updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a workout by ID
router.delete("/:id", async (req, res) => {
  try {
    // Deletes the workout from the database based on the ID
    await Workout.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
