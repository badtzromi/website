const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");
const correct = "492";

function normalize(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function checkAnswer() {
  const val = normalize(answerInput.value);
  if (!val) {
    result.textContent = "Please enter an answer.";
    result.style.color = "#c62828";
    return;
  }
  if (val === correct) {
    result.textContent =
      "Correct! 🎉 - Please check where it is cold and has many of my notes!";
    result.style.color = "#2e7d32";
  } else {
    result.textContent =
      "That is incorrect. Please try again!";
    result.style.color = "#c62828";
  }
}

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkAnswer();
});
