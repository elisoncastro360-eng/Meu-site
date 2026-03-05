let multiplier = 1.00;
let interval;
let crashPoint;
let playing = false;
let bet = 0;
let balance = 1000;

const multiplierDisplay = document.getElementById("multiplier");
const betBtn = document.getElementById("betBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
const balanceDisplay = document.getElementById("balance");
const historyList = document.getElementById("historyList");

function startRound() {
    multiplier = 1.00;
    crashPoint = (Math.random() * 5 + 1).toFixed(2); // Crash entre 1x e 6x
    playing = true;

    interval = setInterval(() => {
        multiplier += 0.01;
        multiplierDisplay.innerText = multiplier.toFixed(2) + "x";

        if (multiplier >= crashPoint) {
            crash();
        }
    }, 100);
}

function crash() {
    clearInterval(interval);
    multiplierDisplay.innerText = "💥 " + crashPoint + "x";
    multiplierDisplay.style.color = "red";

    if (playing) {
        addHistory(crashPoint);
        playing = false;
        bet = 0;
        betBtn.disabled = false;
        cashoutBtn.disabled = true;
    }

    setTimeout(() => {
        multiplierDisplay.style.color = "white";
        multiplierDisplay.innerText = "1.00x";
    }, 2000);
}

function addHistory(value) {
    const item = document.createElement("div");
    item.innerText = value + "x";
    historyList.prepend(item);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

betBtn.addEventListener("click", () => {
    const betInput = document.getElementById("betAmount").value;

    if (betInput <= 0 || betInput > balance) {
        alert("Valor inválido!");
        return;
    }

    bet = parseFloat(betInput);
    balance -= bet;
    balanceDisplay.innerText = balance;

    betBtn.disabled = true;
    cashoutBtn.disabled = false;

    startRound();
});

cashoutBtn.addEventListener("click", () => {
    if (!playing) return;

    clearInterval(interval);

    const winnings = bet * multiplier;
    balance += winnings;
    balanceDisplay.innerText = balance.toFixed(2);

    multiplierDisplay.innerText = "✅ " + multiplier.toFixed(2) + "x";
    multiplierDisplay.style.color = "#16a34a";

    addHistory(multiplier.toFixed(2));

    playing = false;
    bet = 0;
    betBtn.disabled = false;
    cashoutBtn.disabled = true;
});
