const router = require("express").Router();
const { Workout, User, Comment, Category } = require("../../models");

// Get all workouts
router.get("/", async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      include: User,
      Comment,
      Category,
    });
    if (!workoutData) {
      res.status(404).json({ message: "No workout data found" });
      return;
    }
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a workout
router.post("/", async (req, res) => {
  try {
    req.body.user_id = req.session.userId
    const workoutData = await Workout.create(req.body);
    res.status(200).json({ workoutData, message: "Workout created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates a workout
router.put("/:id", async (req, res) => {
  try {
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
    await Workout.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
