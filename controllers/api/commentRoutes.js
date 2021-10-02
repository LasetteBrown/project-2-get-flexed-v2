const router = require('express').Router();
const {Workout, User, Comment, Category} = require('../../models')

// Creates a comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json({commentData, message: 'Comment created'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;