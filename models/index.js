const User = require("./User");
const Comment = require("./Comment");
const Like = require("./Like");
const Workout = require("./Workout");
const Category = require("./Category");

User.hasMany(Workout, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Workout.belongsTo(User, {
  foreignKey: "user_id",
});

Category.hasMany(Workout, {
  foreignKey: "category_id",
});

Workout.belongsTo(Category, {
  foreignKey: "category_id",
});

Workout.hasMany(Comment, {
  foreignKey: "workout_id",
});

Comment.belongsTo(Workout, {
  foreignKey: "workout_id",
});

User.belongsToMany(Workout, {
  through: Like,
  foreignKey: "user_id",
});

Workout.belongsToMany(User, {
    through: Like,
    foreignKey: "workout_id"
})

module.exports = { User, Comment, Like, Workout, Category };
