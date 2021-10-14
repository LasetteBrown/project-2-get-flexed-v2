const router = require("express").Router();
const { Like } = require("../../models");

// Creates a like
router.post("/", async (req, res) => {
  try {
    // Sets the user id of the new like equal to the sessions user id
    req.body.user_id = req.session.userId;

    // Creates the new like with the req.body
    const likeData = await Like.create(req.body);

    // Response saying the like was created
    res.status(200).json({ likeData, message: "Like created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a like
router.delete("/:id", async (req, res) => {
  try {
    // Deleetes the like where the workout id and user id match the session user and the workout page id
    await Like.destroy({
      where: { workout_id: req.params.id, user_id: req.session.userId },
    });

    // Response to show the workout was unliked
    res.status(200).json({ message: "Workout unliked" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
