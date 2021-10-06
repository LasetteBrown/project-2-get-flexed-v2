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

const updateWorkout = (event) => {
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  location.replace(`/edit/${workoutId}`);
};

document
  .querySelector("#delete-button")
  .addEventListener("click", confirmDelete);
document
  .querySelector("#update-button")
  .addEventListener("click", updateWorkout);
