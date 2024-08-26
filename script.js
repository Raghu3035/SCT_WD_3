const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const modeSelect = document.getElementById('mode');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playAgainstComputer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(cellIndex);
    checkWinner();

    if (playAgainstComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function updateCell(index) {
    gameState[index] = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    cells[index].textContent = currentPlayer;
}

function checkWinner() {
    let winner = null;

    for (const [a, b, c] of winningCombinations) {
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            winner = gameState[a];
            break;
        }
    }

    if (winner) {
        message.textContent = `Player ${winner} wins!`;
        gameActive = false;
    } else if (!gameState.includes('')) {
        message.textContent = "It's a tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function computerMove() {
    const emptyIndices = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    updateCell(randomIndex);
    checkWinner();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    message.textContent = '';
}

function updateGameMode() {
    playAgainstComputer = modeSelect.value === 'computer';
    if (playAgainstComputer) {
        document.body.classList.add('vs-computer');
        document.body.classList.remove('vs-human');
    } else {
        document.body.classList.add('vs-human');
        document.body.classList.remove('vs-computer');
    }
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
modeSelect.addEventListener('change', updateGameMode);
