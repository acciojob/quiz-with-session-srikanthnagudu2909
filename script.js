// --- Quiz Questions ---
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

// Load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// --- Render Questions ---
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const p = document.createElement("p");
    p.textContent = question.question;
    questionDiv.appendChild(p);

    // Render options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // ✅ Restore previous selection (Cypress expects [checked="true"])
      if (userAnswers[`question-${i}`] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // <-- Key fix
      }

      // Save progress on change
      input.addEventListener("change", () => {
        userAnswers[`question-${i}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + choice));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionDiv);
  }
}

// --- Calculate Score ---
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const selected = userAnswers[`question-${i}`];
    if (selected === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// --- Show Previous Score ---
function loadPreviousScore() {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreDiv.textContent = `Your last score was ${lastScore} out of ${questions.length}.`;
  }
}

// --- Event Listeners ---
submitBtn.addEventListener("click", calculateScore);

// --- Initialize ---
window.onload = () => {
  renderQuestions();
  loadPreviousScore();
};
