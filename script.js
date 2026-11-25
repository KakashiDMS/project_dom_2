const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which language is used to add interactivity to a web page?",
    answers: ["HTML", "CSS", "JavaScript", "XML"],
    correctAnswer: 2,
  },
  {
    question: "Which keyword declares a variable that can be changed?",
    answers: ["const", "let", "static", "define"],
    correctAnswer: 1,
  },
  {
    question: "Which method selects an element using a CSS selector?",
    answers: [
      "document.getElement()",
      "document.querySelector()",
      "document.findSelector()",
      "document.select()",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which symbol checks if two values are strictly equal?",
    answers: ["=", "==", "===", "!="],
    correctAnswer: 2,
  },
];

// Get the elements we need from the page.
const questionElement = document.querySelector("#question");
const questionNumberElement = document.querySelector(".question-number");
const answerButtons = document.querySelectorAll(".answer");
const scoreElement = document.querySelector("#score");
const nextButton = document.querySelector("#next");
const answersContainer = document.querySelector("#answers");

// Keep track of the quiz progress.
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let quizIsFinished = false;

// Show the current question and its answers.
function displayQuestion() {
  const question = questions[currentQuestionIndex];

  questionElement.textContent = question.question;
  questionNumberElement.textContent =
    "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
  scoreElement.textContent = "Score: " + score;
  answersContainer.hidden = false;
  nextButton.textContent = "Next";
  nextButton.disabled = true;
  selectedAnswer = null;

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = question.answers[i];
    answerButtons[i].classList.remove("selected");
    answerButtons[i].setAttribute("aria-pressed", "false");
  }
}

// Show the final score when there are no more questions.
function displayFinalScore() {
  quizIsFinished = true;
  questionElement.textContent =
    "Quiz complete! Your final score is " + score + " out of " + questions.length + ".";
  questionNumberElement.textContent = "Quiz complete";
  scoreElement.textContent = "Score: " + score + " / " + questions.length;
  answersContainer.hidden = true;
  nextButton.textContent = "Restart";
  nextButton.disabled = false;
}

// Start the quiz again from the first question.
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  quizIsFinished = false;
  displayQuestion();
}

// Let the user choose an answer.
for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function () {
    selectedAnswer = i;

    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].classList.remove("selected");
      answerButtons[j].setAttribute("aria-pressed", "false");
    }

    answerButtons[i].classList.add("selected");
    answerButtons[i].setAttribute("aria-pressed", "true");
    nextButton.disabled = false;
  });
}

// Check the answer and move to the next question.
nextButton.addEventListener("click", function () {
  if (quizIsFinished) {
    restartQuiz();
    return;
  }

  if (selectedAnswer === null) {
    return;
  }

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    displayFinalScore();
  } else {
    displayQuestion();
  }
});

displayQuestion();
