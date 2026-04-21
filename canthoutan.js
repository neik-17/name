document.addEventListener("DOMContentLoaded", () => {

const words = [
    { word: "bwelo", hint: "A word you say after making a statement." },
    { word: "namujane", hint: "A person that acts like a pick-me." },
    { word: "slush", hint: "A word used when you are listing options." },
    { word: "mnm", hint: "A song by Momi Oni." },
    { word: "tequila", hint: "A staple drink for igiters." },
    { word: "kim", hint: "A mother, millionaire, law-student and billionaire." },
    { word: "uniteam", hint: "Green and Red partylist." },
    { word: "alastor", hint: "The Radio Demon." },
    { word: "twerk", hint: "A dance move used in parties." },
    { word: "niki", hint: "The Former Queen Of Rap." },
    { word: "sirkyle", hint: "The Best CS Teacher." },
    { word: "onika", hint: "She eats a lot of burgers." },
    { word: "sophie", hint: "Someone who needs to use deodorant." },
    { word: "punch", hint: "The monkey that has a plushed monkey." },
    { word: "bgc", hint: "A place where genggeng people are not allowed." }

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