const userLogout = async () => {
  // Request to logout user, destroying the current session
  const logout = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (logout.ok) {
    document.location.replace("/");
  } else {
    document.querySelector(".modal").classList.add("is-active");
  }
};

// Event listeners
document.querySelector("#logout").addEventListener("click", userLogout);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".delete").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
