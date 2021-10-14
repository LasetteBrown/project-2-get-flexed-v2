const sequelize = require("../config/connection");
const { User, Category, Comment, Workout } = require("../models");

const categoryData = require("./categoryData.json");
const commentData = require("./commentData.json");
const userData = require("./userData.json");
const workoutData = require("./workoutData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Workout.bulkCreate(workoutData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
