document.addEventListener("DOMContentLoaded", () => {

const words = [
    { word: "planet", hint: "Part of a solar system but not a star." },
    { word: "forest", hint: "A large area filled with tall plants and wildlife." },
    { word: "silver", hint: "A metal often ranked second." },
    { word: "bottle", hint: "Usually sealed before being opened." },
    { word: "pencil", hint: "Leaves marks that can disappear." },
    { word: "flower", hint: "Often blooms during certain seasons." },
    { word: "island", hint: "Separated from the mainland." },
    { word: "library", hint: "Silence is expected here." },
    { word: "diamond", hint: "Known for its brilliance and strength." },
    { word: "mountain", hint: "Higher than a hill." },
    { word: "elephant", hint: "The largest land mammal." },
    { word: "computer", hint: "Processes information electronically." },
    { word: "airplane", hint: "Takes off and lands on runways." },
    { word: "building", hint: "Constructed with walls and a roof." },
    { word: "hospital", hint: "Where emergencies are handled." }

]


const letters = document.querySelector(".word-display");
const hintText = document.querySelector(".hint b");
const guessText = document.querySelector(".guesses b");
const buttons = document.querySelectorAll(".keyboard button");
const gameModal = document.querySelector(".game-modal");
const resultMessage = document.querySelector(".result-message");
const resultImg = document.querySelector(".result-img");
const playAgainBtn = document.querySelector(".play-again");

let selectedWord = "";
let wrongGuesses = 0;
let maxGuesses = 5;

function getRandomWord() {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    selectedWord = randomObj.word.toLowerCase();
    hintText.innerText = randomObj.hint;

    wrongGuesses = 0;
    guessText.innerText = `${wrongGuesses} / ${maxGuesses}`;

    letters.innerHTML = "";
    for (let i = 0; i < selectedWord.length; i++) {
        const li = document.createElement("li");
        li.classList.add("letter");
        letters.appendChild(li);
    }

    buttons.forEach(button => button.disabled = false);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const clickedLetter = button.innerText.trim().toLowerCase();
        button.disabled = true;

        if (selectedWord.includes(clickedLetter)) {
            [...selectedWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    letters.children[index].innerText = letter;
                }
            });
        } else {
            wrongGuesses++;
            guessText.innerText = `${wrongGuesses} / ${maxGuesses}`;

            if (wrongGuesses === maxGuesses) {
                resultMessage.innerText = "You lost 😢 The word was: " + selectedWord;
                resultImg.src = "sadreact.jpg.png";
                gameModal.classList.add("show");
            }
        }

        if (![...letters.children].some(li => li.innerText === "")) {
            resultMessage.innerText = "You won 🎉 2 points are added.";
            resultImg.src = "happyreact.png";
            gameModal.classList.add("show");
            addPoints();
        }
    });
});

getRandomWord();

playAgainBtn.addEventListener("click", () => {
    gameModal.classList.remove("show");
    getRandomWord();
});

});