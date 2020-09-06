const wordEl = document.getElementById("words")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-button")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")

const figureParts = document.querySelectorAll(".figure-part")

const words = ["application", "vietnam", "interface", "danang"]

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

/// show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord.split('').map(letter => `
    <span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
    </span>`)
    .join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, "")

    if (innerWord === selectedWord) {
      finalMessage.innerHTML = "Congratulations! You won!"
      popup.style.display = "flex"
    }
}

// update wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  })

  /// check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = `Unfortunately, you've lost... <br> The answer is: ${selectedWord}`
    popup.style.display = "flex"
  }
}

// play again button
playAgainBtn.addEventListener("click", () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  let selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord()

  updateWrongLettersEl()
  popup.style.display = "none"
})

// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

// keydown letter press
window.addEventListener("keydown", e => {
  /// letters' keycode (65-90 range)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const key = e.key;

    if (selectedWord.includes(key)) {
      if (!correctLetters.includes(key)) {
        correctLetters.push(key);

        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (! wrongLetters.includes(key)) {
        wrongLetters.push(key);

        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

displayWord()
