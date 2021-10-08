const editWorkout = async (event) => {
  event.preventDefault();

  // Getting the workoutID from the params to be used as a workoutID
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  // Creating a workout object
  const workout = {
    title: document.querySelector("#workout-title").value.trim(),
    description: document.querySelector("#workout-description").value.trim(),
    category_id: document.querySelector("#workout-cat").value,
    user_id: null,
  };

  // Fetch request to post the updated workout
  const updateFetch = await fetch(`/api/workout/${workoutId}`, {
    method: "PUT",
    body: JSON.stringify(workout),
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (updateFetch.ok) {
    location.replace(`/workouts/${workoutId}`);
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

// Event listeners
document.querySelector(".edit-form").addEventListener("submit", editWorkout);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
