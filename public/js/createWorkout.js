// Creates a workout and POST to the database
const createWorkout = async (event) => {
  event.preventDefault();

  // Workouts object to POST
  const workout = {
    title: document.querySelector("#workout-title-value").value.trim(),
    description: document.querySelector("#workout-description").value.trim(),
    category_id: document.querySelector("#workout-cat").value,
    user_id: null,
  };

  // Fetch request to POST the workout
  const addWorkout = await fetch("/api/workout", {
    method: "POST",
    body: JSON.stringify(workout),
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (addWorkout.ok) {
    location.replace("/workouts");
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

//Event listeners
document
  .querySelector(".create-form")
  .addEventListener("submit", createWorkout);

document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
