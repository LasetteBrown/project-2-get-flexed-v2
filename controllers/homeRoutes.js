const router = require('express').Router();
const {User, Post, Comment, Workout, Like} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/workouts', async (req, res)=> {
    try {
        const workoutData = await Workout.findAll({include: User});
        const workouts = workoutData.map((workout) => workout.get({plain: true}));
        res.render('workoutList', workouts);
    } catch (err) {
        res.status(500).json(err);
    }
});