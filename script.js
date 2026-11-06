const questions = [
  {
    question: "Your crush leaves you on read for 8 hours. What do you do?",
    answers: [
      { text: "Send 5 more messages 💀", points: 2 },
      { text: "Check their activity every 2 minutes 👀", points: 1 },
      { text: "Go about my day 😌", points: 0 }
    ]
  },
  {
    question: "Your friend eats the last slice of pizza. You...",
    answers: [
      { text: "Start a lifelong rivalry 🍕", points: 2 },
      { text: "Bring it up for the next three weeks", points: 1 },
      { text: "Order another pizza", points: 0 }
    ]
  },
  {
    question: "You accidentally like someone's photo from 2019. You...",
    answers: [
      { text: "Delete my entire account 💀", points: 2 },
      { text: "Unlike it and panic", points: 1 },
      { text: "Laugh and move on", points: 0 }
    ]
  },
  {
    question: "Someone says they don't like your favorite artist.",
    answers: [
      { text: "Block them immediately 🚩", points: 2 },
      { text: "Give them a 30-minute presentation", points: 1 },
      { text: "Respect their opinion", points: 0 }
    ]
  },
  {
    question: "You're losing a game of Mario Kart. You...",
    answers: [
      { text: "Blame the controller 🎮", points: 2 },
      { text: "Demand a rematch", points: 1 },
      { text: "Accept defeat gracefully", points: 0 }
    ]
  },
  {
    question: "Your friend cancels plans at the last minute.",
    answers: [
      { text: "Plan my revenge 😈", points: 2 },
      { text: "Act fine but stay annoyed", points: 1 },
      { text: "Enjoy my unexpected free time", points: 0 }
    ]
  },
  {
    question: "You see someone using light mode in VS Code.",
    answers: [
      { text: "Immediately judge their life choices", points: 2 },
      { text: "Question their sanity 👀", points: 1 },
      { text: "Let people live their lives", points: 0 }
    ]
  },
  {
    question: "You have 10 assignments due tomorrow. You...",
    answers: [
      { text: "Start a new Netflix series 🍿", points: 2 },
      { text: "Panic and make a to-do list", points: 1 },
      { text: "Start working on the assignments", points: 0 }
    ]
  },
  {
    question: "Someone steals your favorite hoodie.",
    answers: [
      { text: "Declare them my enemy forever", points: 2 },
      { text: "Send 15 messages asking for it back", points: 1 },
      { text: "Politely ask for it back", points: 0 }
    ]
  },
  {
    question: "Your phone battery is at 1%. You...",
    answers: [
      { text: "Continue scrolling TikTok 💀", points: 2 },
      { text: "Panic and search for a charger", points: 1 },
      { text: "Put my phone away", points: 0 }
    ]
  }
];


let currentQuestion = 0;
let totalScore = 0;

let playerName = "";

const leaderboardScreen = document.getElementById("leaderboard-screen");

const welcome = document.getElementById("welcome-screen");
const quiz = document.getElementById("quiz-screen");
const result = document.getElementById("result-screen");

document.getElementById("start-btn")
  .addEventListener("click", () => {
    const nameInput =
      document.getElementById("player-name").value.trim();

    if (nameInput === "") {
      alert("Please enter your name first! 💘");
      return;
    }

    playerName = nameInput;
    startQuiz();
  });

document.getElementById("restart-btn")
  .addEventListener("click", startQuiz);


document.getElementById("leaderboard-btn")
  .addEventListener("click", showLeaderboard);

document.getElementById("result-leaderboard-btn")
  .addEventListener("click", showLeaderboard);

document.getElementById("leaderboard-back")
  .addEventListener("click", goHome);

function startQuiz() {
  currentQuestion = 0;
  totalScore = 0;

  welcome.classList.add("hidden");
  result.classList.add("hidden");
  leaderboardScreen.classList.add("hidden");
  quiz.classList.remove("hidden");

  showQuestion();
}


function showQuestion() {

  // Calculate quiz progress
  const percentage = Math.round(
    (currentQuestion / questions.length) * 100
  );

  // Update the progress bar
  document.getElementById("progress-bar").style.width =
    percentage + "%";

  document.getElementById("progress-percent").textContent =
    percentage + "%";

  // Check if all questions are answered
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const item = questions[currentQuestion];

  // Update question number
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // Display question
  document.getElementById("question").textContent =
    item.question;

  // Clear previous answers
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // Create answer buttons
  item.answers.forEach(answer => {

    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      totalScore += answer.points;
      currentQuestion++;
      showQuestion();
    });

    answersDiv.appendChild(button);

  });
}


function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let verdict;
  let description;

  if (totalScore >= 16) {
    verdict = "🚩 CERTIFIED WALKING RED FLAG";
    description = "You are the plot twist everyone warned us about.";
  } else if (totalScore >= 11) {
    verdict = "🚨 CHAOTIC ENERGY";
    description = "Life with you is never boring. Maybe a little concerning.";
  } else if (totalScore >= 6) {
    verdict = "⚠️ QUESTIONABLE BUT LOVABLE";
    description = "A few red flags, but at least you're entertaining.";
  } else {
    verdict = "💚 CERTIFIED GREEN FLAG";
    description = "Emotionally stable? In this economy? Impressive.";
  }

  const maxScore = questions.length * 2;

  const greenFlagEnergy = Math.round(
  (1 - totalScore / maxScore) * 100);
  
  saveScore(playerName, greenFlagEnergy);

  document.getElementById("verdict").textContent =
    verdict;

  document.getElementById("score").textContent =
    description + " Red Flag Score: " +
    totalScore + "/" + maxScore;

  document.getElementById("compatibility").textContent =
  "💚 Green Flag Energy: " + greenFlagEnergy + "%";
}


function saveScore(name, score) {
  const leaderboard = JSON.parse(
    localStorage.getItem("redFlagLeaderboard") || "[]"
  );

  leaderboard.push({
    name: name,
    score: score
  });

  leaderboard.sort((a, b) => b.score - a.score);

  localStorage.setItem(
    "redFlagLeaderboard",
    JSON.stringify(leaderboard.slice(0, 10))
  );
}

function showLeaderboard() {
  welcome.classList.add("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");
  leaderboardScreen.classList.remove("hidden");

  const leaderboard = JSON.parse(
    localStorage.getItem("redFlagLeaderboard") || "[]"
  );

  const list = document.getElementById("leaderboard-list");
  list.innerHTML = "";

  if (leaderboard.length === 0) {
    list.textContent = "No scores yet! Be the first to play.";
    return;
  }

  leaderboard.forEach((player, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    const rank = document.createElement("span");
    rank.textContent = `#${index + 1} ${player.name}`;

    const score = document.createElement("strong");
    score.textContent = `${player.score}% 💚`;

    row.appendChild(rank);
    row.appendChild(score);
    list.appendChild(row);
  });
}

function goHome() {
  leaderboardScreen.classList.add("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");
  welcome.classList.remove("hidden");
}
