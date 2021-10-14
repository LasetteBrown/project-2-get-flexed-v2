const router = require("express").Router();
const { Comment } = require("../../models");

// Creates a comment
router.post("/", async (req, res) => {
  try {
    req.body.user_id = req.session.userId;
    if (req.body.comment == "") {
      req.body.comment = null;
    }
    const commentData = await Comment.create(req.body);
    res.status(200).json({ commentData, message: "Comment created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
