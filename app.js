let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

// Battle Arena Elements
const userImg = document.querySelector("#user-img");
const compImg = document.querySelector("#comp-img");
const userFighter = document.querySelector("#user-fighter");
const compFighter = document.querySelector("#comp-fighter");
const placeholders = document.querySelectorAll(".placeholder");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const updateArena = (userChoice, compChoice, result) => {
  // Show Images, Hide Placeholders
  placeholders.forEach(p => p.style.display = "none");
  userImg.classList.remove("hide");
  compImg.classList.remove("hide");

  // Set Sources (UPDATED PATHS HERE)
  userImg.src = `images/${userChoice}.png`;
  compImg.src = `images/${compChoice}.png`;

  // Reset visual classes
  userFighter.classList.remove("winner", "loser", "draw");
  compFighter.classList.remove("winner", "loser", "draw");
  msg.style.backgroundColor = "transparent"; 

  // Apply visual results
  if (result === "win") {
    userFighter.classList.add("winner");
    compFighter.classList.add("loser");
    msg.style.color = "var(--win-color)";
  } else if (result === "lose") {
    userFighter.classList.add("loser");
    compFighter.classList.add("winner");
    msg.style.color = "var(--lose-color)";
  } else {
    userFighter.classList.add("draw");
    compFighter.classList.add("draw");
    msg.style.color = "var(--draw-color)";
  }
};

const drawGame = (userChoice, compChoice) => {
  msg.innerText = "It's a Draw! 🤝";
  updateArena(userChoice, compChoice, "draw");
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
    updateArena(userChoice, compChoice, "win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
    updateArena(userChoice, compChoice, "lose");
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    msg.innerText = "Choose your weapon!";
    msg.style.color = "var(--text-color)";
    
    // Reset Arena
    userImg.classList.add("hide");
    compImg.classList.add("hide");
    placeholders.forEach(p => p.style.display = "block");
    userFighter.classList.remove("winner", "loser", "draw");
    compFighter.classList.remove("winner", "loser", "draw");
});