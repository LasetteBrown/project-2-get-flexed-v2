const router = require("express").Router();
const { Comment } = require("../../models");

// Creates a comment
router.post("/", async (req, res) => {
  try {
    // Sets the user id of the new comment equal to the sessions user id
    req.body.user_id = req.session.userId;\

    // If the comment is an empty string set to null for a server error to occur
    if (req.body.comment == "") {
      req.body.comment = null;
    }

    // Creates the comment with the req.body
    const commentData = await Comment.create(req.body);

    // Status to say the comment was created successfully
    res.status(200).json({ commentData, message: "Comment created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
