// Selector
const buttons = document.querySelectorAll("button");

// Function to handle the level selection and redirect to the game page.
const selectHandler = (event) => {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("level", level);
  window.location.assign("/");
};

// Add event listeners to each level selection button.
buttons.forEach((button) => {
  button.addEventListener("click", selectHandler);
});
