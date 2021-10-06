const userLogout = async () => {
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

document.querySelector("#logout").addEventListener("click", userLogout);
document
  .querySelector(".modal-background")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("is-active");
  });

document.querySelector(".modal-close").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
});
