// --- Your given quiz questions ---
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load user progress from sessionStorage (if exists)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// --- Display Questions ---
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const label = document.createElement("label");
      const choiceElement = document.createElement("input");

      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore checked state if previously saved
      if (userAnswers[`question-${i}`] === choice) {
        choiceElement.checked = true;
      }

      // Save progress on selection
      choiceElement.addEventListener("change", () => {
        userAnswers[`question-${i}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(" " + choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// --- Calculate and Display Score ---
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const userAnswer = userAnswers[`question-${i}`];
    if (userAnswer === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// --- Load Last Score if Exists ---
function loadPreviousScore() {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreDiv.textContent = `Your last score was ${lastScore} out of ${questions.length}.`;
  }
}

// --- Event Listener for Submit Button ---
submitBtn.addEventListener("click", calculateScore);

// --- On Page Load ---
renderQuestions();
loadPreviousScore();
