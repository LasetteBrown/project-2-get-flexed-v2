// Sends delele request to database with workoutID
const deleteWorkout = async (event) => {
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  const deleteRequest = await fetch(`/api/workout/${workoutId}`, {
    method: "DELETE",
  });

  if (deleteRequest.ok) {
    location.replace("/workouts");
  } else {
    alert("Failed to delete workout");
  }
};

// Checks to make sure the user wants to delete the workout
const confirmDelete = (event) => {
  document.querySelector(".modal").classList.add("is-active");

  document
    .querySelector(".confirm-button")
    .addEventListener("click", function () {
      deleteWorkout();
      document.querySelector(".modal").classList.remove("is-active");
    });
  document
    .querySelector(".cancel-delete-button")
    .addEventListener("click", function () {
      document.querySelector(".modal").classList.remove("is-active");
    });
};

// Sends user to the update page to update their workout
const updateWorkout = (event) => {
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  location.replace(`/edit/${workoutId}`);
};

// Event listenetrs
document
  .querySelector("#delete-button")
  .addEventListener("click", confirmDelete);
document
  .querySelector("#update-button")
  .addEventListener("click", updateWorkout);
