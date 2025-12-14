const quizSection = document.getElementById("quizSection");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const messageEl = document.getElementById("message");

// Store the shuffled order for checking answers
let shuffledQuestions = [];

const questions = [
  {
    question:
      "What day was badtz and kuroms first time meeting?",
    options: [
      "March 4",
      "March 10",
      "March 12",
      "March 14",
      "None of the above",
    ],
    correct: 2,
  },
  {
    question:
      "What day was badtz and kuroms second time meeting?",
    options: [
      "March 4",
      "March 10",
      "March 12",
      "March 14",
      "None of the above",
    ],
    correct: 3,
  },
  {
    question: "When did kuroms come back to Toronto?",
    options: [
      "August 27",
      "August 28",
      "August 29",
      "August 30",
    ],
    correct: 3,
  },
  {
    question: "When is Eevee's birthday?",
    options: [
      "April 7, 2022",
      "April 7, 2023",
      "April 17, 2023",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "Out of these options, which would I pick?",
    options: [
      "Hot honey pizza",
      "New York style cheese pizza",
      "New York style pepperoni pizza",
      "Detroit style pizza",
      "Chicago deep-dish pizza",
    ],
    correct: 2,
  },
  {
    question: "Which of these have I not worked for?",
    options: [
      "Shopify",
      "codepxl",
      "IBM",
      "UofT urban data centre",
      "Government of Canada, student analytics",
      "Teaching assistent for Calulus II",
      "Have worked for all of the above",
    ],
    correct: 4,
  },
  {
    question: "Which of these colours ?",
    options: [
      "Shopify",
      "codepxl",
      "IBM",
      "UofT urban data centre",
      "Government of Canada, student analytics",
      "Teaching assistent for Calulus II",
      "Have worked for all of the above",
    ],
    correct: 4,
  },
  {
    question: "Which of these fruits do I like the least?",
    options: [
      "Kiwi",
      "Apple",
      "Blueberries",
      "Strawberries",
      "Watermelon",
      "Cantolope",
      "Oranges",
      "Pear",
    ],
    correct: 7,
  },
  {
    question: "Which of these colours do I like the least?",
    options: [
      "Yellow",
      "Orange",
      "Pink",
      "Blue",
      "Purple",
      "Green",
    ],
    correct: 0,
  },
  {
    question:
      "If we were to go to a party where we barely know anyone, what am I most likely to do?",
    options: [
      "Leave",
      "Find someone I do know",
      "Talk and meet new people",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question:
      "Which anime film did I watch and like the least?",
    options: [
      "Akira",
      "Perfect Blue",
      "Princess Mononoke",
      "Spirited Away",
      "Chainsaw Man - Reze arc",
      "Ghost in the Shell",
      "Paprika"
    ],
    correct: 0,
  },
  {
    question:
      "Which of these games have I never played?",
    options: [
      "Minecraft",
      "Destiny",
      "Call of Duty",
      "Clash of Clans",
      "Maple Story",
      "PUBG",
      "Apex Legends",
      "CSGO"
    ],
    correct: 7,
  },
];

// ============================================

// Shuffle questions using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createQuestionCard(questionData, index) {
  const card = document.createElement("div");
  card.className = "question-card";
  card.dataset.index = index;
  card.dataset.correctAnswer = questionData.correct;

  const questionText = document.createElement("h3");
  questionText.className = "question-text";
  questionText.textContent = `${index + 1}. ${
    questionData.question
  }`;
  card.appendChild(questionText);

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "options-container";

  questionData.options.forEach((option, optionIndex) => {
    const optionWrapper = document.createElement("div");
    optionWrapper.className = "option-wrapper";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.id = `question-${index}-option-${optionIndex}`;
    radio.value = optionIndex;
    radio.dataset.index = index;

    const label = document.createElement("label");
    label.htmlFor = `question-${index}-option-${optionIndex}`;
    label.textContent = option;

    optionWrapper.appendChild(radio);
    optionWrapper.appendChild(label);
    optionsContainer.appendChild(optionWrapper);
  });

  const feedback = document.createElement("div");
  feedback.className = "feedback-text";
  feedback.dataset.index = index;

  card.appendChild(optionsContainer);
  card.appendChild(feedback);

  return card;
}

function checkAnswers() {
  let allCorrect = true;
  let correctCount = 0;
  let totalCount = shuffledQuestions.length;

  shuffledQuestions.forEach((questionData, index) => {
    const card = quizSection.querySelector(
      `.question-card[data-index="${index}"]`
    );
    const selectedRadio = card.querySelector(
      `input[name="question-${index}"]:checked`
    );
    const feedback = card.querySelector(".feedback-text");
    const correctAnswer = questionData.correct;

    // Remove previous feedback classes
    card.classList.remove("correct", "incorrect");
    feedback.classList.remove("correct", "incorrect");
    feedback.textContent = "";

    if (!selectedRadio) {
      allCorrect = false;
      feedback.textContent = "Please select an answer";
      feedback.classList.add("incorrect");
    } else {
      const selectedIndex = parseInt(selectedRadio.value);
      if (selectedIndex === correctAnswer) {
        card.classList.add("correct");
        feedback.classList.add("correct");
        feedback.textContent = "✓ Correct!";
        correctCount++;
      } else {
        card.classList.add("incorrect");
        feedback.classList.add("incorrect");
        feedback.textContent = "✗ Incorrect";
        allCorrect = false;
      }
    }
  });

  // Show overall message
  if (allCorrect && correctCount === totalCount) {
    messageEl.textContent = `🎉 Perfect! You got all ${totalCount} correct! 🎉`;
    messageEl.className = "message success";
  } else if (correctCount > 0) {
    messageEl.textContent = `You got ${correctCount} out of ${totalCount} correct. Keep trying!`;
    messageEl.className = "message";
  } else {
    messageEl.textContent =
      "Try again! Check your answers.";
    messageEl.className = "message error";
  }
}

function resetGame() {
  shuffledQuestions.forEach((questionData, index) => {
    const card = quizSection.querySelector(
      `.question-card[data-index="${index}"]`
    );
    const radios = card.querySelectorAll(
      `input[name="question-${index}"]`
    );
    const feedback = card.querySelector(".feedback-text");

    card.classList.remove("correct", "incorrect");
    feedback.classList.remove("correct", "incorrect");
    feedback.textContent = "";

    radios.forEach((radio) => {
      radio.checked = false;
    });
  });

  messageEl.textContent = "";
  messageEl.className = "message";
}

function initQuiz() {
  quizSection.innerHTML = "";

  if (questions.length === 0) {
    messageEl.textContent =
      "No questions configured. Please add questions to the questions array in dec21.js";
    messageEl.className = "message error";
    return;
  }

  // Shuffle the questions for random order on each load
  shuffledQuestions = shuffleArray(questions);

  shuffledQuestions.forEach((questionData, index) => {
    const card = createQuestionCard(questionData, index);
    quizSection.appendChild(card);
  });

  messageEl.textContent =
    "Select the correct answer for each question.";
  messageEl.className = "message";
}

// Event listeners
checkBtn.addEventListener("click", checkAnswers);
resetBtn.addEventListener("click", resetGame);

// Allow Enter key to check answers
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !checkBtn.disabled) {
    checkAnswers();
  }
});

// Initialize quiz on load
initQuiz();
