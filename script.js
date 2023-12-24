let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

// Add this JavaScript code in your existing script.js or create a new script file

const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPause');
const prevSongBtn = document.getElementById('prevSong');
const nextSongBtn = document.getElementById('nextSong');

let currentSongIndex = 0; // Keeps track of the current song index

// Function to play or pause the audio
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play();
    playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '&#9658;'; // Play icon
  }
});

// Function to play the previous song
prevSongBtn.addEventListener('click', () => {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = audioPlayer.children.length - 1;
  }
  changeSong(currentSongIndex);
});

// Function to play the next song
nextSongBtn.addEventListener('click', () => {
  if (currentSongIndex < audioPlayer.children.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  changeSong(currentSongIndex);
});

// Function to change the current song
function changeSong(index) {
  audioPlayer.src = audioPlayer.children[index].src;
  audioPlayer.load();
  audioPlayer.play();
  playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
}

// Optional: Auto-play the first song when the page loads
window.addEventListener('load', () => {
  changeSong(currentSongIndex);
});
