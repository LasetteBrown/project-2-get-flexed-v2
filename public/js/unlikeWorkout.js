const unlikeWorkout = async () => {
  // Getting the workoutID to send to the database
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  // Delete request to remove the like from the database
  const deleteLike = await fetch(`/api/like/${workoutId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (deleteLike.ok) {
    location.replace(`/workouts/${workoutId}`);
  } else {
    alert("Failed to unlike workout");
  }
};

// Event listener
document
  .querySelector("#liked-button")
  .addEventListener("click", unlikeWorkout);
