// عناصر من الصفحة
const button = document.getElementById("gameButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const clickSound = document.getElementById("clickSound");

// متغيرات الحالة
let score = 0;
let highScore = 0;
let timeLeft = 5;
let timerId = null;

// دالة لضمان بقاء الزر داخل الشاشة
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// تحريك الزر إلى مكان عشوائي مرئي
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

// بدء المؤقت مع مسح أي مؤقت سابق
function startTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timeLeft = 5;
  timerDisplay.textContent = `الوقت: ${timeLeft}`;

  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `الوقت: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      endRound();
    }
  }, 1000);
}

// إنهاء الجولة وإظهار النقاط وأعلى نقاط
function endRound() {
  if (score > highScore) {
    highScore = score;
  }

  alert(`انتهى الوقت!\nنقاطك: ${score}\nأعلى نقاط: ${highScore}`);
  score = 0;
  scoreDisplay.textContent = `النقاط: ${score}`;
  moveButton();
  startTimer();
}

// معالجة النقر على الزر
button.addEventListener("click", async () => {
  score++;
  scoreDisplay.textContent = `النقاط: ${score}`;

  try {
    await clickSound.play();
  } catch (e) {
    // بعض المتصفحات قد تمنع الصوت
  }

  moveButton();
  // لا نعيد تشغيل المؤقت هنا حتى لا يتداخل
});

// تهيئة أولية عند تحميل الصفحة
window.addEventListener("load", () => {
  moveButton();
  startTimer();
});

// إعادة تموضع الزر عند تغيير حجم النافذة
window.addEventListener("resize", moveButton);

// تأثير النجوم في الخلفية
function createStar() {
  const star = document.createElement("div");
  star.style.position = "absolute";
  star.style.width = "6px";
  star.style.height = "6px";
  star.style.borderRadius = "50%";
  star.style.background = "#fff";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  document.body.appendChild(star);

  setTimeout(() => star.remove(), 3000);
}

setInterval(createStar, 500);
