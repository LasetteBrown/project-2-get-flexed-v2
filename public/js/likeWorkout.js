const likeWorkout = async () => {
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  const like = {
    workout_id: workoutId,
    user_id: null,
  };

  const createLike = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify(like),
    headers: { "Content-Type": "application/json" },
  });

  if (createLike.ok) {
    location.replace(`/workouts/${workoutId}`);
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

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
