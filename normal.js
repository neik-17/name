document.addEventListener("DOMContentLoaded", () => {

const words = [
    { word: "sun", hint: "The star at the center of our solar system." },
    { word: "map", hint: "A drawing that shows locations and directions." },
    { word: "ice", hint: "Frozen water." },
    { word: "pen", hint: "A tool used for writing with ink." },
    { word: "hat", hint: "Something worn on the head." },
    { word: "tree", hint: "A tall plant with a trunk and branches." },
    { word: "ship", hint: "A large boat used for traveling on water." },
    { word: "star", hint: "A bright object seen in the night sky." },
    { word: "rain", hint: "Water that falls from clouds." },
    { word: "wolf", hint: "A wild animal related to dogs." },
    { word: "apple", hint: "A sweet fruit that can be red, green, or yellow." },
    { word: "train", hint: "A vehicle that runs on tracks." },
    { word: "bread", hint: "A baked food made from flour and water." },
    { word: "chair", hint: "A piece of furniture used for sitting." },
    { word: "cloud", hint: "A visible mass of water droplets in the sky." },
    { word: "river", hint: "A natural flowing stream of water." },
    { word: "plant", hint: "A living organism that makes its own food through sunlight." },
    { word: "light", hint: "Something that makes things visible." }
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
            resultMessage.innerText = "You won 🎉";
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