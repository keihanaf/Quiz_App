// Get the high scores from local storage, if available. Otherwise, set it to an empty array.
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Selector
const list = document.querySelector("ol");

// Generate the list of high scores from local storage.
const content = highScores.map((score, index) => {
  return `
        <li>
           <span>${index + 1}</span> 
           <p>${score.name}</p>
           <span>${score.score}</span>
        </li>
    `;
});
list.innerHTML = content.join("");
