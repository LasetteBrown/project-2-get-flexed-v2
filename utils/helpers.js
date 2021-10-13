module.exports = {
  format_date: (date) => {
    // Format created dates for workouts
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  if_equals: (userId, postUserId) => {
    // Checking to see if the user is the user who made the post
    if (userId == postUserId) {
      return true;
    } else {
      return false;
    }
  },
};
