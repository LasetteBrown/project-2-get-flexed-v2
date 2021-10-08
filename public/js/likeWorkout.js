const likeWorkout = async () => {
  // Get the ID for the workout from the URL
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  // Creating a like object to POST
  const like = {
    workout_id: workoutId,
    user_id: null,
  };

  // POST request to the database
  const createLike = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify(like),
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (createLike.ok) {
    location.replace(`/workouts/${workoutId}`);
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

//Event listeners
document
  .querySelector("#unliked-button")
  .addEventListener("click", likeWorkout);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
