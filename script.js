let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let lapList = document.getElementById('lapList');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let lapCount = 0;
let lapTimes = [];

startBtn.addEventListener('click', function () {
    if (timer) {
        timer = false;
        startBtn.innerHTML = 'Start';
        stopBtn.innerHTML = 'Pause';
    } else {
        timer = true;
        startBtn.innerHTML = 'Pause';
        stopBtn.innerHTML = 'Stop';
        stopWatch();
    }
});

stopBtn.addEventListener('click', function () {
    timer = false;
    startBtn.innerHTML = 'Resume';
});

resetBtn.addEventListener('click', function () {
    timer = false;
    hour = minute = second = count = 0;
    lapCount = 0;
    lapList.innerHTML = '';
    updateDisplay();
    startBtn.innerHTML = 'Start';
    stopBtn.innerHTML = 'Pause';
});

lapBtn.addEventListener('click', function () {
    if (timer) {
        lapCount++;
        const lapTime = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}:${formatTime(count)}`;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

function stopWatch() {
    if (timer) {
        count++;
        if (count === 100) {
            second++;
            count = 0;
        }

        if (second === 60) {
            minute++;
            second = 0;
        }

        if (minute === 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        updateDisplay();
        setTimeout(stopWatch, 10);
    }
}

function updateDisplay() {
    document.getElementById('hr').innerHTML = formatTime(hour);
    document.getElementById('min').innerHTML = formatTime(minute);
    document.getElementById('sec').innerHTML = formatTime(second);
    document.getElementById('count').innerHTML = formatTime(count);
}

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}