let balance = 1000000;
let currentBet = 0;
let multiplier = 1;
let crashPoint = 0;
let interval;
let isPlaying = false;
let time = 0;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const multiplierDisplay = document.getElementById("multiplier");
const betBtn = document.getElementById("betBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
const betAmountInput = document.getElementById("betAmount");
const balanceDisplay = document.getElementById("balance");
const historyList = document.getElementById("historyList");
const crashArea = document.querySelector(".crash-area");

const tickSound = document.getElementById("tickSound");
const crashSound = document.getElementById("crashSound");

function generateCrashPoint() {
    return (Math.random() * 4 + 1.2);
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#22c55e");
    gradient.addColorStop(1, "#4ade80");

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    for (let x = 0; x < time; x++) {
        let y = canvas.height - (Math.pow(1.02, x) - 1) * 5;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#22c55e";
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.fillText("✈️", time - 10, canvas.height - (Math.pow(1.02, time) - 1) * 5);
}

function startGame() {
    multiplier = 1;
    crashPoint = generateCrashPoint();
    time = 0;
    isPlaying = true;

    interval = setInterval(() => {
        time += 2;
        multiplier = Math.pow(1.02, time / 10);

        multiplierDisplay.textContent = multiplier.toFixed(2) + "x";

        if (currentBet > 0) {
            const possibleWin = currentBet * multiplier;
            cashoutBtn.textContent = "Cash Out (" + possibleWin.toFixed(2) + " MZN)";
        }

        drawGraph();

        if (multiplier >= crashPoint) {
            crashSound.play();
            crashArea.classList.add("crash-flash");
            setTimeout(() => crashArea.classList.remove("crash-flash"), 500);
            endGame(false);
        }

    }, 100);
}

function endGame(cashedOut) {
    clearInterval(interval);
    isPlaying = false;
    betBtn.disabled = false;
    cashoutBtn.disabled = true;
    cashoutBtn.textContent = "Cash Out";

    if (!cashedOut && currentBet > 0) {
        addToHistory(crashPoint.toFixed(2));
    }

    currentBet = 0;

    setTimeout(() => {
        startGame();
    }, 2000);
}

function addToHistory(value) {
    const item = document.createElement("div");
    item.textContent = value + "x";
    historyList.prepend(item);
}

function animateBalance() {
    balanceDisplay.parentElement.classList.add("balance-animate");
    setTimeout(() => {
        balanceDisplay.parentElement.classList.remove("balance-animate");
    }, 300);
}

betBtn.onclick = () => {
    const betValue = parseFloat(betAmountInput.value);
    if (!betValue || betValue > balance || currentBet > 0) return;

    currentBet = betValue;
    balance -= betValue;
    balanceDisplay.textContent = balance.toFixed(2);
    animateBalance();

    betBtn.disabled = true;
    cashoutBtn.disabled = false;
};

cashoutBtn.onclick = () => {
    if (!isPlaying || currentBet <= 0) return;

    const winnings = currentBet * multiplier;
    balance += winnings;
    balanceDisplay.textContent = balance.toFixed(2);
    animateBalance();

    addToHistory(multiplier.toFixed(2));
    endGame(true);
};

startGame();
