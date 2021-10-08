const router = require("express").Router();
const {Like } = require("../../models");

// Creates a like
router.post("/", async (req, res) => {
  try {
    req.body.user_id = req.session.userId;
    const likeData = await Like.create(req.body);
    res.status(200).json({ likeData, message: "Like created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a like
router.delete("/:id", async (req, res) => {
  try {
    await Like.destroy({
      where: { workout_id: req.params.id, user_id: req.session.userId },
    });

    res.status(200).json({ message: "Workout unliked" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
