// عناصر الصفحة
const button = document.getElementById("gameButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highDisplay  = document.getElementById("high");
const clickSound = document.getElementById("clickSound");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

// الحالة
let score = 0;
let highScore = 0;
let timeLeft = 10;     // ← مدة الجولة
let timerId = null;

// أدوات
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
  highDisplay.textContent  = `أعلى نقاط: ${highScore}`;
}

// مؤقت الجولة
function startTimer() {
  // لا تشغل مؤقتًا جديدًا إذا كان القديم يعمل
  if (timerId !== null) return;

  // ابدأ من 10 دائمًا عند بدء الجولة
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
  updateHUD();

  alert(`انتهى الوقت!\nنقاطك: ${score}\nأعلى نقاط: ${highScore}`);

  // إعادة التهيئة للجولة التالية
  score = 0;
  timeLeft = 10;
  updateHUD();
  moveButton();

  // أظهر شاشة البداية لبدء جولة جديدة
  startScreen.style.display = "grid";
}

button.addEventListener("click", async () => {
  score++;
  updateHUD();

  try {
    await clickSound.play();
  } catch (_) {
    // قد يمنع المتصفح التشغيل التلقائي للصوت
  }

  moveButton();
});

// بدء اللعب من شاشة البداية
startButton.addEventListener("click", () => {
  // أخفِ شاشة البداية، ثم حرّك الزر وابدأ المؤقت
  startScreen.style.display = "none";
  moveButton();
  startTimer();
});

// تهيئة أولية
window.addEventListener("load", () => {
  updateHUD();
  moveButton();
});

// إعادة تموضع الزر عند تغيير حجم النافذة
window.addEventListener("resize", moveButton);

// نجوم ديكورية
function createStar() {
  const star = document.createElement("div");
  star.style.position = "absolute";
  star.style.width = "6px";
  star.style.height = "6px";
  star.style.borderRadius = "50%";
  star.style.background = "#fff";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top  = Math.random() * window.innerHeight + "px";
  star.style.opacity = "0.9";
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 3000);
}
setInterval(createStar, 500);
