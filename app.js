const titleEl = document.querySelector(".title");
const btnEl = document.querySelector(".btn");
const audioEl = document.querySelector(".audio");
const darkModeBtnEl = document.querySelector(".dark-mode");
const mainEl = document.querySelector(".main");
const addTelBtnEl = document.querySelector(".add-tel");
const showTelBtnEl = document.querySelector(".show-tel");
const phoneListEl = document.querySelector(".phone-list");

const TEL = [
  // "+998 90 999 77 81",
  // "+998 99 190 84 50",
  // "+998 90 007 70 77",
  // "+998 94 115 11 58",
  // "+998 93 163 16 21",
  // "+998 95 009 13 50",
  // "+998 94 441 41 88",
  // "+998 93 880 05 71",
  // "+998 99 418 50 35",
  // "+998 88 727 31 11",
  // "+998 91 683 10 60",
  // "+998 97 392 08 22",
  // "+998 99 396 71 72",
  // "+998 93 693 41 43",
  // "+998 90 149 46 43",
];

// Telefon raqamini random tanlash
function randomTel() {
  btnEl.setAttribute("disabled", true);
  const interval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * TEL.length);
    titleEl.textContent = TEL[randomNumber];
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    btnEl.removeAttribute("disabled");
    // remove
    TEL.splice(TEL.indexOf(titleEl.textContent), 1);
    audioEl.play();
    confetti({
      particleCount: 500,
      spread: 400,
      origin: { y: 0.9 },
    });
  }, 3000);
}

btnEl.addEventListener("click", randomTel);

// Dark mode
function toggleDarkMode() {
  mainEl.classList.toggle("dark");
  darkModeBtnEl.classList.toggle("dark");

  if (mainEl.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
}

darkModeBtnEl.addEventListener("click", toggleDarkMode);

if (localStorage.getItem("dark-mode") === "enabled") {
  mainEl.classList.add("dark");
  darkModeBtnEl.classList.add("dark");
}

// Telefon raqamini qo'shish
function addNewPhoneNumber() {
  const newPhone = prompt(
    "Yangi telefon raqamini kiriting: (+998 XX XXX XX XX)"
  );
  if (newPhone) {
    const phoneRegex = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;
    if (!phoneRegex.test(newPhone)) {
      alert("Iltimos, raqamni to'g'ri formatda kiriting! (+998 XX XXX XX XX)");
      return;
    }

    if (TEL.includes(newPhone)) {
      alert("Bu raqam allaqachon mavjud: " + newPhone);
    } else {
      TEL.push(newPhone);
      alert(`Telefon raqami muvaffaqiyatli qo'shildi: ${newPhone}`);
    }
  }
}

addTelBtnEl.addEventListener("click", addNewPhoneNumber);

function showPhoneNumbers() {
  if (phoneListEl.style.display === "block") {
    phoneListEl.style.display = "none";
    showTelBtnEl.textContent = "Show";
  } else {
    phoneListEl.innerHTML = "";

    if (TEL.length === 0) {
      phoneListEl.innerHTML = "<p>Hozircha hech qanday raqam mavjud emas.</p>";
    } else {
      TEL.forEach((phone) => {
        const phoneItem = document.createElement("div");
        phoneItem.classList.add("phone-item");
        phoneItem.textContent = phone;
        phoneListEl.appendChild(phoneItem);
      });
    }

    phoneListEl.style.display = "block";
    showTelBtnEl.textContent = "Hide";
  }
}

showTelBtnEl.addEventListener("click", showPhoneNumbers);
