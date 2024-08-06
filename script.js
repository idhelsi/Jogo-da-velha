// Define um objeto "square" representando o tabuleiro do jogo da velha com nove espaços vazios
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

// Define a variável "player" para controlar qual jogador está atualmente jogando
let player = ''

// Define a variável "warning" para exibir mensagens informativas durante o jogo
let warning = ''

// Define a variável "playing" para controlar se o jogo está em andamento ou não
let playing = false

// Função para reiniciar o jogo
reset()

// Adiciona um ouvinte de evento para o botão de resetar o jogo
document.querySelector('.reset').addEventListener('click', reset)

// Adiciona um ouvinte de evento para cada área do tabuleiro
document.querySelectorAll('.area').forEach(item => {
    item.addEventListener('click', itemClick)
})

// Função que é chamada quando uma área do tabuleiro é clicada
function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    // Verifica se o jogo está em andamento e se a área clicada está vazia
    if(playing && square[item] === '') {
        square[item] = player
        renderSquare() // Atualiza o tabuleiro após um movimento
        togglePlayer() // Alterna o jogador atual
    }
}

// Função para reiniciar o jogo
function reset() {
    warning = ''

    // Gera um número aleatório (0 ou 1) para determinar qual jogador começa
    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'x' : 'o'

    // Reseta todas as áreas do tabuleiro para vazio
    for(let i in square) {
        square[i] = ''
    }

    playing = true // Define o jogo como em andamento

    renderSquare() // Atualiza o tabuleiro
    renderInfo() // Atualiza as informações do jogador atual e mensagens
}

// Função para atualizar o tabuleiro na interface do usuário
function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }

    checkGame() // Verifica se o jogo acabou após cada atualização do tabuleiro
}

// Função para renderizar as informações do jogador atual e mensagens
function renderInfo() {
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
}

// Função para alternar entre jogadores
function togglePlayer () {
    player = (player === 'x') ? 'o': 'x'
    renderInfo() // Atualiza as informações do jogador após a troca
}

// Função para verificar se há um vencedor ou empate
function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu'
        playing = false
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu'
        playing = false
    } else if(isFull()){
        warning = 'Deu empate'
        playing = false
    }
}

// Função para verificar se um determinado jogador venceu
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in pos) {
        let pArray = pos[w].split(',')
        let hasWon = pArray.every(option => square[option] === player)
        if(hasWon) {
            return true
        }
    }

    return false
}

// Função para verificar se o tabuleiro está cheio
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false
        }
    }

    return true
}
