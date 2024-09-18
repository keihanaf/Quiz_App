// Get the score from local storage, if available. Otherwise, set it to 0.
const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// Selectors
const scoreElement = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

// Display the score in the DOM
scoreElement.innerText = score;

// Function to display the high scores in the DOM
// This function handles the saving of the user's score to local storage.
const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score: score };
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("scores");
    window.location.assign("/");
  }
};
// Add event listener to the "Save" button
button.addEventListener("click", saveHandler);
