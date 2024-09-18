import formatData from "./helper.js";

// Get the level from local storage, if available. Otherwise, default to medium.
const level = localStorage.getItem("level") || "medium";

// Selectors
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");

// Constants
const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

// Global variables
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

// Function to fetch data from the API and display it
const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formatedData = formatData(json.results);
    start();
  } catch (error) {
    alert("Failed to fetch data. Please try again later.");
  }
};

// Function to display the fetched data in the DOM
const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

// Function to display the next question and update the user interface accordingly
const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } = formatedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((answer, index) => {
    answer.innerText = answers[index];
  });
};

// Function to handle the user's selection and check if it's correct
const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

// Function to handle the "next" button click and move to the next question
const nextHandler = () => {
  if (questionIndex < formatedData.length - 1) {
    questionIndex++;
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

// Function to handle the "finish" button click and display the final score
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

// Function to remove classes from the previous question's answers
const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = "answer-text";
  });
};

// Fetch data when the page loads and display it
window.addEventListener("load", fetchData);

// Function to check if the selected answer is correct
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});

// Function to handle the "next" button click and move to the next question
nextButton.addEventListener("click", nextHandler);

// Function to handle the "finish" button click and display the final score
finishButton.addEventListener("click", finishHandler);
