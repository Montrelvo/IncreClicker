let score = 0;
let rate = 1;
let clickPower = 1;
let prestigeLevel = 0;
let currentLayer = 1;

const scoreDisplay = document.getElementById('score');
const passiveMenu = document.getElementById('passive-menu');
const activeMenu = document.getElementById('active-menu');
const clickBtn = document.getElementById('click-btn');
const prestigeBtn = document.getElementById('prestige-btn');

const passiveUpgrades = [
    { name: 'Auto-Clicker', cost: 50, boost: 1, layer: 1 },
    { name: 'Team of Miners', cost: 200, boost: 5, layer: 1 },
    { name: 'Super Miners', cost: 500, boost: 10, layer: 2 }
];

function updateDisplay() {
    scoreDisplay.textContent = 'Score: ' + Math.floor(score);
}

setInterval(() => {
    score += rate;
    updateDisplay();
}, 1000);

clickBtn.addEventListener('click', () => {
    score += clickPower;
    updateDisplay();
});

prestigeBtn.addEventListener('click', () => {
    prestigeLevel++;
    score = 0;
    rate = 1;
    clickPower = 1;
    updateDisplay();
});

function populateMenus() {
    passiveUpgrades.forEach((upg, i) => {
        if (upg.layer === currentLayer) {
            const opt = new Option(`${upg.name} (+\${upg.boost}/s) - \${upg.cost}`, i);
            passiveMenu.append(opt);
        }
    });
}

passiveMenu.addEventListener('change', e => {
    const upg = passiveUpgrades[e.target.value];
    if (score >= upg.cost) {
        score -= upg.cost;
        rate += upg.boost;
        updateDisplay();
    }
    passiveMenu.selectedIndex = 0; // reset to placeholder
});

updateDisplay();
populateMenus();