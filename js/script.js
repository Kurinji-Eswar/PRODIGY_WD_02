let startTime, updateTime, interval;
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapTimes = document.getElementById('lapTimes');

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('pauseButton').addEventListener('click', pause);
document.getElementById('resetButton').addEventListener('click', reset);
document.getElementById('lapButton').addEventListener('click', lap);

function start() {
  if (!interval) {
    startTime = Date.now() - (updateTime || 0);
    interval = setInterval(update, 10);
  }
}

function pause() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    updateTime = Date.now() - startTime;
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  updateTime = 0;
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
  millisecondsDisplay.textContent = '00';
  lapTimes.innerHTML = '';
}

function lap() {
  const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapTimes.appendChild(lapItem);
}

function update() {
  const timeElapsed = Date.now() - startTime;
  const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((timeElapsed / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((timeElapsed % 1000) / 10).toString().padStart(2, '0');
  
  hoursDisplay.textContent = hours;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
  millisecondsDisplay.textContent = milliseconds;
}
