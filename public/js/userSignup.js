// Creating a user object and POSTing to the database
const createUser = async (event) => {
  event.preventDefault();

  const user = {
    name: document.querySelector("#name-signup").value.trim(),
    email: document.querySelector("#email-signup").value.trim(),
    password: document.querySelector("#password-signup").value.trim(),
  };

  const fetchUser = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  // Check to make sure it comes back as a 200
  if (fetchUser.ok) {
    location.replace("/workouts");
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

// Event listeners
document.querySelector("#signup-form").addEventListener("submit", createUser);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
