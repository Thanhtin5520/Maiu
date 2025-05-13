const giftBox = document.getElementById("giftBox");
const loverImage = document.getElementById("loverImage");
const popup = document.getElementById("questionPopup");
const yesBtn = document.getElementById("yesBtn");
const veryYesBtn = document.getElementById("veryYesBtn");
const noBtn = document.getElementById("noBtn");
const loveMessage = document.getElementById("loveMessage");
const coupleImage = document.getElementById("coupleImage");
const loverImageWrapper = document.getElementById("loverImageWrapper");
const backdrop = document.querySelector(".popup-backdrop");

// Khi nhấn vào hộp quà
giftBox.addEventListener("click", () => {
  giftBox.classList.add("hidden");
  loverImageWrapper.classList.remove("hidden");
  loverImageWrapper.classList.add("lover-pop");
  setTimeout(() => {
    loverImageWrapper.classList.remove("lover-pop");
  }, 1300); // Thời gian trùng với animation mới
});

// Khi nhấn vào ảnh người yêu thì ẩn ảnh và hiện popup
loverImageWrapper.addEventListener("click", () => {
  loverImage.classList.add("fade-out");
  setTimeout(() => {
    loverImageWrapper.classList.add("hidden");
    loverImage.classList.remove("fade-out");
    // Hiện nền mờ và popup
    backdrop.classList.remove("hidden");
    setTimeout(() => backdrop.classList.add("active"), 10);
    popup.classList.remove("hidden");
  }, 700);
});

// Khi nhấn "Có" hoặc "Có rất nhiều"
function showLove() {
  popup.classList.add("hidden");
  loveMessage.classList.remove("hidden");
  loveMessage.classList.remove("move-center");

  // Đặt vị trí và kích thước trùng với popup
  const popupRect = popup.getBoundingClientRect();
  loveMessage.classList.add("popup-pos");
  loveMessage.style.top = popupRect.top + "px";
  loveMessage.style.left = popupRect.left + "px";
  loveMessage.style.width = popupRect.width + "px";
  loveMessage.style.height = popupRect.height + "px";

  setTimeout(() => {
    loveMessage.classList.add("move-center");
    loveMessage.classList.remove("popup-pos");
    loveMessage.style.top = "";
    loveMessage.style.left = "";
    loveMessage.style.width = "";
    loveMessage.style.height = "";
  }, 1000);

  setTimeout(() => {
    loveMessage.classList.add("hidden");
    loveMessage.classList.remove("move-center");
    // Ẩn popup, hiện ảnh cuối và hiệu ứng
    document.querySelector('.couple-wrapper').classList.remove('hidden');
    coupleImage.classList.remove("hidden");
    document.body.classList.add("love-bg");
    // Ẩn hoàn toàn backdrop khi hiện ảnh cuối
    backdrop.classList.remove("active");
    backdrop.classList.add("hidden");
    startHearts(true);
    startSparkles();
    drawHeartPaths();
  }, 3000);
}

yesBtn.addEventListener("click", showLove);
veryYesBtn.addEventListener("click", showLove);

// Xử lý nút "Không" chạy trốn
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

function moveNoButton() {
  const container = document.getElementById("questionPopup");
  const maxX = container.offsetWidth - noBtn.offsetWidth;
  const maxY = container.offsetHeight - noBtn.offsetHeight;

  // Đảm bảo vị trí mới khác với vị trí hiện tại
  let newX, newY;
  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
  } while (
    Math.abs(newX - parseInt(noBtn.style.left || 0)) < 50 &&
    Math.abs(newY - parseInt(noBtn.style.top || 0)) < 50
  );

  // Khi hover/click mới set position: absolute
  noBtn.style.position = "absolute";
  noBtn.style.transition = "all 0.3s ease";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  // Đưa nút lên trên các nút khác
  noBtn.style.zIndex = 10;
}

// Hiệu ứng trái tim bay
function startHearts(isLoveBg) {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.innerText = ["❤️","💖","💘","💕"][Math.floor(Math.random()*4)];
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 2000);
  }, isLoveBg ? 120 : 300);
  if (isLoveBg) setTimeout(() => clearInterval(interval), 4000);
}

// Hiệu ứng lấp lánh
function startSparkles() {
  for(let i=0;i<20;i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.innerText = "✨";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = (60 + Math.random() * 30) + "vh";
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 2000);
    }, Math.random()*2000);
  }
}

function drawHeartPaths() {
  const heartEffects = document.getElementById('heartEffects');
  heartEffects.innerHTML = '';
  const hearts = ["❤️","💖","💘","💕"];
  for(let i=0;i<4;i++) {
    const span = document.createElement('span');
    span.className = `heart-path heart-path${i+1}`;
    span.innerText = hearts[i%hearts.length];
    heartEffects.appendChild(span);
  }
}
