const button = document.getElementById("gameButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highDisplay = document.getElementById("highScore");
const clickSound = document.getElementById("clickSound");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

let score = 0;
let highScore = 0;
let timeLeft = 10;
let timerId = null;

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function moveButton() {
  const btnWidth = button.offsetWidth || 120;
  const btnHeight = button.offsetHeight || 48;
  const maxX = window.innerWidth - btnWidth - 8;
  const maxY = window.innerHeight - btnHeight - 8;
  const x = clamp(Math.random() * maxX, 8, maxX);
  const y = clamp(Math.random() * maxY, 70, maxY);
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

function updateHUD() {
  scoreDisplay.textContent = `النقاط: ${score}`;
  timerDisplay.textContent = `الوقت: ${timeLeft}`;
  highDisplay.textContent = `أعلى نقاط: ${highScore}`;
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = 10;
  updateHUD();

  timerId = setInterval(() => {
    timeLeft--;
    updateHUD();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      endRound();
    }
  }, 1000);
}

function endRound() {
  if (score > highScore) {
    highScore = score;
  }

  alert(`انتهى الوقت!\nنقاطك: ${score}\nأعلى نقاط: ${highScore}`);

  score = 0;
  timeLeft = 10;
  updateHUD();
  moveButton();
  startScreen.style.display = "grid";
}

button.addEventListener("click", async () => {
  score++;
  updateHUD();

  try {
    await clickSound.play();
  } catch (_) {}

  moveButton();
});

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  score = 0;
  timeLeft = 10;
  updateHUD();
  moveButton();
  startTimer();
});

window.addEventListener("load", () => {
  updateHUD();
  moveButton();
});

window.addEventListener("resize", moveButton);
