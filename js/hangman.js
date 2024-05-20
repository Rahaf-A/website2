const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const wordList = ['application', 'programming', 'interface', 'wizard'];

let selectedIndex = Math.floor(wordList.length * Math.random());
let selectedWord = wordList[selectedIndex];

const correctLetters = [];
const wrongLetters = [];
let gameEnded = false;

// Show word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
          <span class ="letter">
          ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `).join('')
    }
 `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord && !gameEnded) {
        finalMessage.innerText = 'Congratulations! You Won!';
        popup.style.display = 'flex';
        gameEnded = true;
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //  if lost
    if (wrongLetters.length === figureParts.length && !gameEnded) {
        finalMessage.innerText = `Unfortunately you lost! The word was "${selectedWord}".`;
        popup.style.display = 'flex';
        gameEnded = true;
    }
}

// show message
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {
    if (gameEnded) return;

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    gameEnded = false;
    correctLetters.length = 0;
    wrongLetters.length = 0;

    selectedIndex = Math.floor(wordList.length * Math.random());
    selectedWord = wordList[selectedIndex];

    displayWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
