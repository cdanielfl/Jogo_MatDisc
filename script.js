// Variáveis do jogo
let currentQuestion = 0;
let score = 0;
let lives = 3;
const questions = [
    {
        question: "Uma função f: A → B é injetora quando:",
        options: [
            "Todo elemento de B tem correspondente em A",
            "Elementos diferentes de A têm imagens diferentes em B",
            "Todo elemento de A tem pelo menos um correspondente em B",
            "A imagem de A é igual a B"
        ],
        correct: 1,
        explanation: "Uma função é injetora quando elementos diferentes do domínio (A) têm imagens diferentes no contradomínio (B)."
    },
    {
        question: "Qual das seguintes funções é bijetora?",
        options: [
            "f(x) = x²",
            "f(x) = x³",
            "f(x) = |x|",
            "f(x) = 2x + 1"
        ],
        correct: 3,
        explanation: "f(x) = 2x + 1 é bijetora porque é ao mesmo tempo injetora e sobrejetora (para conjuntos infinitos como ℝ→ℝ)."
    },
    {
        question: "Se f(x) = 2x e g(x) = x + 3, qual é f(g(2))?",
        options: [
            "7",
            "10",
            "5",
            "4"
        ],
        correct: 1,
        explanation: "Primeiro calculamos g(2) = 2 + 3 = 5, depois f(5) = 2*5 = 10."
    }
];

// Elementos do DOM
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const tutorialScreen = document.getElementById('tutorial-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const tutorialBtn = document.getElementById('tutorial-btn');
const backBtn = document.getElementById('back-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score-value');
const livesElement = document.getElementById('lives-value');
const finalScoreElement = document.getElementById('final-score');

// Event Listeners
startBtn.addEventListener('click', startGame);
tutorialBtn.addEventListener('click', showTutorial);
backBtn.addEventListener('click', showMenu);
restartBtn.addEventListener('click', restartGame);

// Funções do jogo
function startGame() {
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
    updateStats();
}

function showTutorial() {
    menuScreen.classList.add('hidden');
    tutorialScreen.classList.remove('hidden');
}

function showMenu() {
    tutorialScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    lives = 3;
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
    updateStats();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    if (selectedIndex === question.correct) {
        feedbackElement.textContent = "Correto! " + question.explanation;
        feedbackElement.className = "correct";
        score += 10;
    } else {
        feedbackElement.textContent = "Incorreto! " + question.explanation;
        feedbackElement.className = "incorrect";
        lives--;
    }

    updateStats();
    currentQuestion++;

    setTimeout(() => {
        feedbackElement.textContent = "";
        loadQuestion();
    }, 2000);
}

function updateStats() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;

    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
}