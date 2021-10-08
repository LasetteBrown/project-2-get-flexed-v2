// Shows the comment form when the 'Add comment' button is clicked
const showComment = async (event) => {
  let commentForm = document.querySelector(".comment");
  commentForm.classList.remove("hide");
};

// Creates a comment and POST to the database 
const createComment = async (event) => {
  event.preventDefault();
  // Gets the last part of the URL to use as the workoutID
  const pathParams = window.location.pathname + window.location.search;
  const pathArry = pathParams.split("/");
  const workoutId = pathArry[2];

  // Creating a commetn object
  const comment = {
    comment: document.querySelector("#comment-description").value.trim(),
    workout_id: workoutId,
    user_id: null,
  };

  // Fetch request
  const addComment = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (addComment.ok) {
    location.replace(`/workouts/${workoutId}`);
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

// Event Listeners
document
  .querySelector("#comment-button")
  .addEventListener("click", showComment);
document
  .querySelector(".comment-form")
  .addEventListener("submit", createComment);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });
document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
