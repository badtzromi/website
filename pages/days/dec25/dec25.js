const quizSection = document.getElementById("quizSection");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const messageEl = document.getElementById("message");

// Store the shuffled order for checking answers
let shuffledQuestions = [];

const questions = [
  {
    question:
      "Which country is credited with starting the tradition of the Christmas tree?",
    options: [
      "France",
      "Germany",
      "England",
      "Norway",
      "Canada",
    ],
    correct: 1,
  },
  {
    question:
      "What year was the first Christmas card sent?",
    options: ["1795", "1812", "1843", "1860", "1901"],
    correct: 2,
  },
  {
    question:
      "In the song 'Jingle Bells', what is the name of the horse?",
    options: [
      "Snowflake",
      "Dash",
      "Midnight",
      "Bobtail",
      "Comet",
    ],
    correct: 3,
  },
  {
    question:
      "Which reindeer is known for having a red nose?",
    options: [
      "Dasher",
      "Blitzen",
      "Comet",
      "Cupid",
      "Rudolph",
    ],
    correct: 4,
  },
  {
    question:
      "What popular Christmas beverage is also known as milk punch?",
    options: [
      "Hot chocolate",
      "Apple cider",
      "Eggnog",
      "Mulled wine",
      "Ginger ale",
    ],
    correct: 2,
  },
  {
    question:
      "Which Christmas movie features the line 'Every time a bell rings, an angel gets his wings'?",
    options: [
      "Home Alone",
      "Miracle on 34th Street",
      "A Christmas Story",
      "It's a Wonderful Life",
      "The Polar Express",
    ],
    correct: 3,
  },
  {
    question: "On which date is Christmas celebrated?",
    options: [
      "December 24",
      "December 25",
      "December 26",
      "January 1",
      "January 6",
    ],
    correct: 1,
  },
  {
    question:
      "According to tradition, where does Santa Claus live year-round?",
    options: [
      "Greenland",
      "Iceland",
      "The North Pole",
      "Lapland",
      "Antarctica",
    ],
    correct: 2,
  },
  {
    question:
      "Which Christmas song is technically a Thanksgiving song that everyone plays in December?",
    options: [
      "Jingle Bells",
      "Silent Night",
      "Deck the Halls",
      "Winter Wonderland",
      "Let It Snow",
    ],
    correct: 0,
  },
  {
    question:
      "What snack is famously left out for Santa on Christmas Eve?",
    options: [
      "Milk and cookies",
      "Hot chocolate and marshmallows",
      "Fruitcake",
      "Candy canes",
      "Gingerbread",
    ],
    correct: 0,
  },
  {
    question:
      "Which reindeer only gets to lead the sleigh because of one very shiny feature?",
    options: [
      "Dasher",
      "Comet",
      "Cupid",
      "Blitzen",
      "Rudolph",
    ],
    correct: 4,
  },
  {
    question:
      "In the movie Home Alone, where is Kevin’s family accidentally traveling without him?",
    options: [
      "New York",
      "London",
      "Paris",
      "Rome",
      "Tokyo",
    ],
    correct: 2,
  },
  {
    question:
      "What Christmas decoration was once made using real candles (and caused a lot of stress)?",
    options: [
      "Wreaths",
      "Garlands",
      "Stockings",
      "Christmas trees",
      "Advent calendars",
    ],
    correct: 3,
  },
  {
    question:
      "Which holiday treat is most likely to be re-gifted rather than eaten?",
    options: [
      "Chocolate truffles",
      "Sugar cookies",
      "Candy canes",
      "Gingerbread houses",
      "Fruitcake",
    ],
    correct: 4,
  },
  {
    question:
      "How does Santa supposedly fit down the chimney (according to tradition)?",
    options: [
      "Magic",
      "Teleportation",
      "Shrinking technology",
      "He doesn't — it's a myth",
      "Very carefully",
    ],
    correct: 0,
  },
  {
    question:
      "Which Christmas movie turned the phrase 'You'll shoot your eye out!' into a holiday classic?",
    options: [
      "Elf",
      "Home Alone",
      "A Christmas Story",
      "The Santa Clause",
      "National Lampoon’s Christmas Vacation",
    ],
    correct: 2,
  },
  {
    question:
      "What color are Santa’s clothes said to have been before modern marketing?",
    options: ["Red", "Blue", "Green", "Brown", "White"],
    correct: 1,
  },
  {
    question:
      "Which Christmas song has the lyric 'Everyone dancing merrily in the new old-fashioned way'?",
    options: [
      "White Christmas",
      "Jingle Bell Rock",
      "Rockin’ Around the Christmas Tree",
      "Feliz Navidad",
      "Silver Bells",
    ],
    correct: 2,
  },
  {
    question:
      "What holiday activity is most likely to end with tangled wires and mild frustration?",
    options: [
      "Wrapping gifts",
      "Hanging ornaments",
      "Decorating the tree with lights",
      "Baking cookies",
      "Building a snowman",
    ],
    correct: 2,
  },
  {
    question:
      "In Elf, what are the four main food groups according to Buddy?",
    options: [
      "Cookies, milk, candy, syrup",
      "Candy, candy canes, candy corns, syrup",
      "Sugar, chocolate, cookies, cake",
      "Candy canes, gumdrops, frosting, syrup",
      "Chocolate, syrup, waffles, candy",
    ],
    correct: 1,
  },
  {
    question:
      "Which Christmas decoration has a tradition of hiding a pickle?",
    options: [
      "Wreath",
      "Stocking",
      "Tree ornament",
      "Advent calendar",
      "Table centerpiece",
    ],
    correct: 2,
  },
  {
    question:
      "Which Christmas song is the most likely to get stuck in your head for days?",
    options: [
      "All I Want for Christmas Is You",
      "Silent Night",
      "O Holy Night",
      "Away in a Manger",
      "Carol of the Bells",
    ],
    correct: 0,
  },
  {
    question:
      "What happens if you shake a snow globe too aggressively?",
    options: [
      "More snow appears",
      "Time freezes",
      "Nothing — but it feels dramatic",
      "A tiny blizzard forms",
      "Santa gets alerted",
    ],
    correct: 2,
  },
  {
    question:
      "Which Christmas movie villain is defeated mostly by household items?",
    options: [
      "The Grinch",
      "Hans Gruber",
      "The Wet Bandits",
      "Scut Farkus",
      "Jack Frost",
    ],
    correct: 2,
  },
  {
    question:
      "What is the true purpose of ugly Christmas sweaters?",
    options: [
      "Staying warm",
      "Fashion",
      "Holiday irony",
      "Winning family contests",
      "All of the above",
    ],
    correct: 4,
  },
  {
    question:
      "What is the most common reason people rewatch the same Christmas movies every year?",
    options: [
      "Tradition",
      "Nostalgia",
      "Background noise",
      "Comfort",
      "All of the above",
    ],
    correct: 4,
  },
  {
    question:
      "Which of the following is NOT one of Santa’s original reindeer?",
    options: [
      "Dasher",
      "Dancer",
      "Prancer",
      "Blitzen",
      "Clarice",
    ],
    correct: 4,
  },
  {
    question:
      "What magical item brings Frosty the Snowman to life?",
    options: [
      "A candy cane",
      "A scarf",
      "A magic hat",
      "A snowflake",
      "A Christmas bell",
    ],
    correct: 2, // A magic hat
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
      "No questions configured. Please add questions to the questions array in dec25.js";
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
