const loginForm = async (event) => {
  event.preventDefault();

  const user = {
    email: document.querySelector("#email-login").value.trim(),
    password: document.querySelector("#password-login").value.trim(),
  };

  if (user.email && user.password) {
    const login = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    if (login.ok) {
      document.location.replace("/workouts");
    } else {
      document.querySelector(".modal").classList.add("is-active");
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", loginForm);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
