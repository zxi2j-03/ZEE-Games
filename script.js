// مراجع العناصر
const button = document.getElementById("gameButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const clickSound = document.getElementById("clickSound");

// متغيرات الحالة
let score = 0;
let timeLeft = 0;
let timerId = null;

// دالة لضمان بقاء الزر داخل الشاشة
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// تحريك الزر إلى مكان عشوائي مرئي
function moveButton() {
  const btnWidth = button.offsetWidth || 120;   // تقدير احتياطي
  const btnHeight = button.offsetHeight || 48;

  const maxX = window.innerWidth - btnWidth - 8;  // هامش بسيط
  const maxY = window.innerHeight - btnHeight - 8;

  const x = clamp(Math.random() * maxX, 8, maxX);
  const y = clamp(Math.random() * maxY, 70, maxY); // رفعه قليلاً تحت العنوان

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

// بدء المؤقت مع مسح أي مؤقت سابق
function startTimer() {
  // مسح المؤقت السابق إن وجد
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

// إنهاء الجولة وإعادة التهيئة
function endRound() {
  alert(`انتهى الوقت! نقاطك: ${score}`);
  score = 0;
  scoreDisplay.textContent = `النقاط: ${score}`;
  moveButton();
  startTimer();
}

// معالجة النقر
button.addEventListener("click", async () => {
  score++;
  scoreDisplay.textContent = `النقاط: ${score}`;

  // تشغيل الصوت بأمان
  try {
    await clickSound.play();
  } catch (e) {
    // بعض المتصفحات قد تمنع الصوت؛ نتجاهل الخطأ
    // console.warn("تعذر تشغيل الصوت:", e);
  }

  moveButton();
  startTimer(); // إعادة ضبط الوقت عند كل نقرة
});

// تهيئة أولية بعد تحميل الصفحة
window.addEventListener("load", () => {
  moveButton();
  startTimer();
});

// تحديث تموضع الزر عند تغيير حجم النافذة
window.addEventListener("resize", moveButton);
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

  setTimeout(() => star.remove(), 3000); // تختفي بعد 3 ثوانٍ
}

setInterval(createStar, 500); // تظهر نجمة كل نصف ثانية



