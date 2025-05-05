// Elementos do DOM
const elementos = {
    telas: {
        menu: document.getElementById('menu-screen'),
        jogo: document.getElementById('game-screen'),
        tutorial: document.getElementById('tutorial-screen'),
        gameOver: document.getElementById('game-over-screen')
    },
    botoes: {
        iniciar: document.getElementById('start-btn'),
        tutorial: document.getElementById('tutorial-btn'),
        voltar: document.getElementById('back-btn'),
        proxima: document.getElementById('next-btn'),
        reiniciar: document.getElementById('restart-btn')
    },
    jogo: {
        pontuacao: document.querySelector('#score span'),
        vidas: document.querySelector('#lives span'),
        textoPergunta: document.getElementById('question-text'),
        opcoes: document.getElementById('options-container'),
        feedback: document.getElementById('feedback'),
        pontuacaoFinal: document.getElementById('final-score')
    }
};

// Estado do Jogo
const jogo = {
    perguntaAtual: 0,
    pontuacao: 0,
    vidas: 3,
    perguntas: [
        {
            pergunta: "Uma função f: A → B é injetora quando:",
            opcoes: [
                "Todo elemento de B tem correspondente em A",
                "Elementos diferentes de A têm imagens diferentes em B",
                "Todo elemento de A tem pelo menos um correspondente em B",
                "A imagem de A é igual a B"
            ],
            correta: 1,
            explicacao: "Uma função é injetora quando elementos diferentes do domínio (A) têm imagens diferentes no contradomínio (B)."
        },
        {
            pergunta: "Qual das seguintes funções é bijetora?",
            opcoes: [
                "f(x) = x²",
                "f(x) = x³",
                "f(x) = |x|",
                "f(x) = 2x + 1"
            ],
            correta: 3,
            explicacao: "f(x) = 2x + 1 é bijetora porque é ao mesmo tempo injetora e sobrejetora (para conjuntos infinitos como ℝ→ℝ)."
        },
        {
            pergunta: "Se f(x) = 2x e g(x) = x + 3, qual é f(g(2))?",
            opcoes: [
                "7",
                "10",
                "5",
                "4"
            ],
            correta: 1,
            explicacao: "Primeiro calculamos g(2) = 2 + 3 = 5, depois f(5) = 2*5 = 10."
        }
    ]
};

// Funções do Jogo
function mostrarTela(tela) {
    for (const t in elementos.telas) {
        elementos.telas[t].classList.add('hidden');
    }
    elementos.telas[tela].classList.remove('hidden');
}

function iniciarJogo() {
    jogo.perguntaAtual = 0;
    jogo.pontuacao = 0;
    jogo.vidas = 3;
    atualizarInterface();
    mostrarTela('jogo');
    carregarPergunta();
}

function carregarPergunta() {
    elementos.botoes.proxima.classList.remove('visible');
    elementos.jogo.feedback.textContent = '';
    elementos.jogo.feedback.className = 'feedback-box';

    if (jogo.perguntaAtual >= jogo.perguntas.length) {
        finalizarJogo();
        return;
    }

    const pergunta = jogo.perguntas[jogo.perguntaAtual];
    elementos.jogo.textoPergunta.textContent = pergunta.pergunta;
    elementos.jogo.opcoes.innerHTML = '';

    pergunta.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.className = 'option-btn';
        botao.addEventListener('click', () => verificarResposta(index));
        elementos.jogo.opcoes.appendChild(botao);
    });
}

function verificarResposta(indice) {
    const pergunta = jogo.perguntas[jogo.perguntaAtual];
    const botoes = document.querySelectorAll('.option-btn');

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === pergunta.correta) {
        elementos.jogo.feedback.innerHTML = `
            <div class="feedback-correct">✓ ${pergunta.explicacao}</div>
        `;
        elementos.jogo.feedback.className = 'feedback-box correct';
        jogo.pontuacao += 10;
    } else {
        elementos.jogo.feedback.innerHTML = `
            <div class="feedback-incorrect">✗ Resposta incorreta!</div>
            <div class="feedback-correct">✓ ${pergunta.explicacao}</div>
        `;
        elementos.jogo.feedback.className = 'feedback-box incorrect';
        jogo.vidas--;
    }

    atualizarInterface();
    elementos.botoes.proxima.classList.add('visible');
}

function proximaPergunta() {
    jogo.perguntaAtual++;
    carregarPergunta();
}

function finalizarJogo() {
    elementos.jogo.pontuacaoFinal.textContent = jogo.pontuacao;
    mostrarTela('gameOver');
}

function atualizarInterface() {
    elementos.jogo.pontuacao.textContent = jogo.pontuacao;
    elementos.jogo.vidas.textContent = jogo.vidas;

    if (jogo.vidas <= 0) {
        finalizarJogo();
    }
}

// Event Listeners
elementos.botoes.iniciar.addEventListener('click', iniciarJogo);
elementos.botoes.tutorial.addEventListener('click', () => mostrarTela('tutorial'));
elementos.botoes.voltar.addEventListener('click', () => mostrarTela('menu'));
elementos.botoes.reiniciar.addEventListener('click', iniciarJogo);
elementos.botoes.proxima.addEventListener('click', proximaPergunta);

// Inicialização
mostrarTela('menu');