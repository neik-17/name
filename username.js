function saveUsername(){
    let username = document.forms["player-form"]["username"].value;
    localStorage.setItem("username", username);
    let validChars = /^[a-zA-Z0-9_]+$/;

    if (username.trim() === "") {
        alert(`Please enter a username!`);
    } else if (!validChars.test(username)) {
        //if da person uses unvalid chars
        alert(`Username can only have letters, numbers, and underscores!`);
    } else {
        localStorage.setItem("username", username);
        alert(`Username ${username} saved successfully!`);
    }
}


function displayGreeting() {
    const savedName = localStorage.getItem("username");
    const greetingElement = document.getElementById("greetings");

    if (savedName && greetingElement) {
        greetingElement.innerText = `Welcome, ${savedName}!`;
    } else if (greetingElement) {
        greetingElement.innerText = `Welcome, Guest!`;
    }
}

function addPoints() {
    let username = localStorage.getItem("username");
    
    // Create a unique key for this specific user (e.g., "points_s0rrow")
    let storageKey = "points_" + username;

    // 1. Get their current points (default to 0)
    let currentPoints = localStorage.getItem(storageKey) || 0;

    // 2. Add 1 point
    let newTotal = Number(currentPoints) + 1;

    // 3. Save it back to their specific key
    localStorage.setItem(storageKey, newTotal);

    console.log("Point saved for " + username + "! New total: " + newTotal);
    
    displayPoints();
}

function displayPoints() {
    let username = localStorage.getItem("username");
    let storageKey = "points_" + username;

    const scoreElement = document.getElementById("points");
    if (!scoreElement) return;

    // Get the points for the CURRENT user only
    let points = localStorage.getItem(storageKey) || 0;
    scoreElement.innerText = "Points: " + points;
}

function displayLeaderboard() {
    const box = document.getElementById("leaderboard");
    if (!box) return;

    // 1. Get all keys, filter for points, and map them to a simple list
    let list = Object.keys(localStorage)
        .filter(key => key.includes("points_"))
        .map(key => ({ name: key.replace("points_", ""), score: Number(localStorage.getItem(key)) }));

    // 2. Sort it (The "Super Simple" part)
    list.sort((a, b) => b.score - a.score);

    // 3. Display it
    box.innerHTML = "<h3>🏆 Leaderboard</h3>" + 
        list.map(p => `<p>${p.name}: ${p.score}</p>`).join("");
}

window.addEventListener('DOMContentLoaded', () => {
    displayGreeting();
    displayPoints();
    displayLeaderboard();
});
