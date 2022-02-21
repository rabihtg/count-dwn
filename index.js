const seconds = document.querySelector(".seconds .number");
const minutes = document.querySelector(".minutes .number");
const hours = document.querySelector(".hours .number");
const days = document.querySelector(".days .number");
const fBtn = document.querySelector(".fast-forward");
const rewindBtn = document.querySelector(".rewind");
const popUp = document.querySelector(".pop-up");

let timeOut = 1000;
let timer = window.setInterval(watchSimulator, timeOut);
let timeOver = false;

fBtn.addEventListener("click", () => {
  if (!timeOver && timeOut > 0) {
    timeOut -= 250;
    window.clearInterval(timer);
    timer = window.setInterval(watchSimulator, timeOut);
    popUp.textContent = timeOut / 1000;
    popUp.classList.add("shown");
    window.setTimeout(() => {
      popUp.classList.remove("shown");
    }, 500);
  }
});
rewindBtn.addEventListener("click", () => {
  if (!timeOver && timeOut < 1000) {
    timeOut += 250;
    window.clearInterval(timer);
    timer = window.setInterval(watchSimulator, timeOut);
    popUp.textContent = timeOut / 1000;
    popUp.classList.add("shown");
    window.setTimeout(() => {
      popUp.classList.remove("shown");
    }, 500);
  }
});
function leftZero(time) {
  if (time.textContent < 10 && time.textContent >= 0) {
    time.textContent = "0" + time.textContent;
  }
}

function watchSimulator() {
  seconds.textContent = parseInt(seconds.textContent) - 1;
  leftZero(seconds);
  if (seconds.textContent < 0) {
    seconds.textContent = 59;
    minutes.textContent = parseInt(minutes.textContent) - 1;
    leftZero(minutes);
    if (minutes.textContent < 0) {
      minutes.textContent = 59;
      hours.textContent = parseInt(hours.textContent) - 1;
      leftZero(hours);
      if (hours.textContent < 0) {
        hours.textContent = 23;
        days.textContent = parseInt(days.textContent) - 1;
        leftZero(days);
      }
    }
  }
  checkOver();
}

function checkOver() {
  if (days.textContent == 0) {
    days.parentElement.classList.add("over");
    if (hours.textContent == 0) {
      hours.parentElement.classList.add("over");
      if (minutes.textContent == 0) {
        minutes.parentElement.classList.add("over");
        if (seconds.textContent == 9) {
          seconds.style.animation =
            "heartBeat " + timeOut + "ms ease-in-out 0s 10 forwards";
          timeOver = true;
        }
        if (seconds.textContent == 0) {
          seconds.parentElement.classList.add("over");
          seconds.textContent = "00";
          window.clearInterval(timer);
        }
      }
    }
  }
}
