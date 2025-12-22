const quizSection = document.getElementById("quizSection");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const messageEl = document.getElementById("message");

// Store the shuffled order for checking answers
let shuffledQuestions = [];

const questions = [
  {
    question: "What is badtz go-to comfort food?",
    options: [
      "Pizza",
      "Burgers",
      "Pasta",
      "Something homemade",
      "Noodle soup",
      "Com ga",
      "Pizza and burgers",
      "Pizza, something homdemade, or com ga",
    ],
    correct: 7,
  },
  {
    question: "What does badtz usually do when he has a free evening?",
    options: [
      "Plays games",
      "Watch anime or read manga",
      "Go out with friends",
      "Works on a side project",
      "Doom scroll",
      "Watch a movie",
      "All of the above",
    ],
    correct: 1,
  },
  {
    question: "What is his biggest weakness?",
    options: [
      "Sleeping in too late",
      "Procrastination",
      "Thinking about Eevee too much",
      "All of the above",
      "None of the above",
    ],
    correct: 3,
  },
  {
    question: "What is badtz ideal weekend?",
    options: [
      "Staying indoors and recharging",
      "Going on a spontaneous trip",
      "Being productive",
      "All of the above",
    ],
    correct: 0,
  },
  {
    question: "What is something that instantly puts badtz in a good mood?",
    options: [
      "Good food",
      "Music",
      "Reading a book",
      "Watching a movie",
      "All of the above",
    ],
    correct: 0,
  },
  {
    question: "What is badtz most likely splurge on?",
    options: [
      "Tech",
      "Food",
      "Vacation",
      "Clothes",
      "Shoes",
      "Tech and Vacation",
      "None of the above"
    ],
    correct: 5,
  },
  {
    question: "What is not badtz love language?",
    options: [
      "Time spent together",
      "Acts of service",
      "Physical touch",
      "Gift giving",
    ],
    correct: 3,
  },
  {
    question: "What annoys him the fastest?",
    options: [
      "Being interrupted",
      "Disorganization",
      "Running late",
      "Bad communication",
      "Being rudely told what to do",
      "All of the above",
    ],
    correct: 4,
  },
  {
    question: "What does badtz do when mad?",
    options: [
      "Ignore and not talk much",
      "Yell a lot",
      "Acts completely normal but you can tell",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "If badtz could master one skill instantly, what would it be?",
    options: [
      "Cooking",
      "A new language",
      "A sport",
      "An instrument",
      "Something career-related",
      "All of the above",
    ],
    correct: 2,
  },
  {
    question: "What is the most badtz-like text response?",
    options: [
      "A single word",
      "A paragraph",
      "An emoji",
      "A meme",
      "Responds mentally but forgets to send",
      "Single word or meme",
      "None of the above",
    ],
    correct: 5,
  },
  {
    question: "Who is not in my top 5 soccer players list?",
    options: [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Diego Maradona",
      "Pele",
      "Ronaldo (The Phenomenon)",
      "These are all in his top 5",
    ],
    correct: 3,
  },
  {
    question: "Who is my basketball goat?",
    options: [
      "LeBron James",
      "Michael Jordan",
      "Bill Russell",
      "Larry Bird",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "Which manga do I like the most out of these?",
    options: [
      "Vagabond",
      "Berserk",
      "Mob psycho",
      "Death Note"
    ],
    correct: 0,
  },
  {
    question: "Which of these TV shows have I not watched?",
    options: [
      "Gravity Falls",
      "Bojack Horseman",
      "Adventure Time",
      "Neon Genesis Evangelion",
    ],
    correct: 2,
  },
  {
    question: "What socceer position would I least want to play?",
    options: [
      "Centre Attacking Mid",
      "Left back",
      "Right wing",
      "Centre Defensive Mid",
    ],
    correct: 1,
  },
  {
    question: "How many point-per-game did I average in high-school basketball?",
    options: [
      "5",
      "10",
      "15",
      "20",
      "Some other number",
      "Did not play high-school basketball"
    ],
    correct: 5,
  },
  {
    question: "How many prominent lines do I have on my palm?",
    options: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "None of the above"
    ],
    correct: 2,
  },
  {
    question: "Which of these OG animes have I not watched at all?",
    options: [
      "Neon Genesis Evangelion",
      "Cowboy Bebop",
      "Sumari Champloo",
      "Full Metal Alchemist",
      "Fairy Tail",
      "Naruto",
      "Dragon ball",
      "Hunter x Hunter"
    ],
    correct: 6,
  },
  {
    question: "What is my favourite game of all time to play?",
    options: [
      "Kingdom Hearts",
      "Spyro",
      "Mario",
      "Minecraft",
      "Fortnite",
      "Kirby",
    ],
    correct: 3,
  },
  {
    question: "What is my least favourite subject out of these?",
    options: [
      "History",
      "English",
      "Accounting",
      "Accounting",
      "Chemistry",
      "Biology",
    ],
    correct: 1,
  },
  {
    question: "What was the first programming language I learned?",
    options: [
      "C",
      "C++",
      "Java",
      "PHP",
      "JavaScript",
      "Python",
    ],
    correct: 5,
  },
  {
    question: "Which trait of Chobbert do I think most highly of?",
    options: [
      "Intellect",
      "Athleticism",
      "Reliability",
      "Loyalty",
      "Knowledge",
      "Intellect and Loyalty",
      "Reliability and Loyalty",
      "All of the above",
    ],
    correct: 6,
  },
  {
    question: "Which would I choose as my starter Pokemon",
    options: [
      "Charmander",
      "Bulbasaur",
      "Squirtle",
    ],
    correct: 0,
  },
  {
    question: "What month did we adopt Eevee",
    options: [
      "April",
      "May",
      "June",
      "July",
      "August",
      "None of the above"
    ],
    correct: 4,
  },
  {
    question: "What sport did I not play growing up",
    options: [
      "Basketball",
      "Ball hockey",
      "Baseball",
      "Tennis",
      "Volleyball",
      "Badminton",
    ],
    correct: 5,
  },
  {
    question: "What instruments have I not learned (even if only a bit)",
    options: [
      "Piano",
      "Trumpet",
      "Violin",
      "Drums",
    ],
    correct: 3,
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
      "No questions configured. Please add questions to the questions array in dec23.js";
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
