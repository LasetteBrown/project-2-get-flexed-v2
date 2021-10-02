const router = require('express').Router();
const {Workout, User, Comment, Category, Like} = require('../../models')

// Creates a like
router.get('/', async (req, res) => {
    try {
        const LikeData = await Like.create(req.body);
        res.status(200).json({likedata, message: 'Like created'});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deltes a like
router.delete('/:id', async (req, res) => {
    try {
        await Like.destroy({where: {id: req.params.id}});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;