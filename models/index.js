const User = require('./User');
const Comment = require('./Comments');
const Like = require('./Like');
const Workout = require('./Workout');
const Category = require('./Category');


User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });


User.hasMany(Comments, {
    foreignKey: 'comments_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

Workout.belongsTo(User, {
    foreignKey: 'user_id'
});


Category.hasMany(Workout, {
    foreignKey: 'workout_id'
});

Workout.belongsTo(Category, {
    foreignKey: 'category_id'
})


Workout.hasMany(Comments, {
        foreignKey: 'comments_id'
})

Comments.belongsTo(Workout, {
 foreignKey: 'workout_id'
})


User.belongsToMany(Workout, {
    through: Like,
    foreignKey: 'workout_id'
  });
  
 

module.exports = {User, Comment, Like, Workout, Category}

