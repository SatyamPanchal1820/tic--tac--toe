const buttons = document.querySelectorAll(".XO");
const turnDisplay = document.getElementById("turn");
const newGameBtn = document.getElementById("newGame");
const p1WinTxt = document.getElementById("p1W");
const p2WinTxt = document.getElementById("p2W");

let whoseTurn = "p1";
let numMoves = 0;
let p1Wins = 0;
let p2Wins = 0;

turnDisplay.textContent = "Player 1's Turn";

buttons.forEach((button) => {
  button.disabled = false;
  button.addEventListener("click", function(){
    if(whoseTurn === "p1"){
      button.textContent = "X";
      button.style.color = "Red";
      whoseTurn = "p2";
      turnDisplay.textContent = "Player 2's Turn";
    }else{
      button.textContent = "O";
      button.style.color = "blue";
      whoseTurn = "p1";
      turnDisplay.textContent = "Player 1's Turn";
    }
    button.disabled = true;
    numMoves += 1;
    if(checkWin()){
      winner();
      p1WinTxt.textContent = "P1 Wins: " + p1Wins;
      p2WinTxt.textContent = "P2 Wins: " + p2Wins;
    }
    if(numMoves == 9 && !checkWin()){
      turnDisplay.textContent = "Tie Game";
    }
  });
});

newGameBtn.addEventListener("click", () =>{
  reset();
});

function checkWin(){

  // Row win
  for(let i = 0; i < 9; i = i + 3){
    if(buttons[i].textContent ==  buttons[i+1].textContent && buttons[i+1].textContent == buttons [i+2].textContent && buttons[i].textContent !== ""){
      buttons[i].classList.add("rowWin");
      buttons[i+1].classList.add("rowWin");
      buttons[i+2].classList.add("rowWin");
      console.log("Row Win");
      return true;
    }
  }

  // Column win
  for(let i = 0; i < 3; i+= 1){
    if(buttons[i].textContent ==  buttons[i+3].textContent && buttons[i+3].textContent == buttons [i+6].textContent && buttons[i].textContent !== ""){
      buttons[i].classList.add("colWin");
      buttons[i+3].classList.add("colWin");
      buttons[i+6].classList.add("colWin");
      console.log("Col Win");
      return true;
    }
  }

  // Diagonal top left to bottom right
  if(buttons[0].textContent ==  buttons[4].textContent && buttons[4].textContent == buttons[8].textContent && buttons[4].textContent !== ""){
      buttons[0].classList.add("diag1Win");
      buttons[4].classList.add("diag1Win");
      buttons[8].classList.add("diag1Win");
      console.log("Diag1 Win");
      return true;

  }
  // Diagonal top right to bototm left
  if(buttons[2].textContent ==  buttons[4].textContent && buttons[4].textContent == buttons[6].textContent && buttons[4].textContent !== ""){
      buttons[2].classList.add("diag2Win");
      buttons[4].classList.add("diag2Win");
      buttons[6].classList.add("diag2Win");
      console.log("Diag2 Win");
      return true;
  }
  return false;

}

function winner(){
  if(whoseTurn === "p1"){
    turnDisplay.textContent = "Player 2 Wins";
    turnDisplay.style.color = "blue";
    p2Wins += 1;
  }else{
    turnDisplay.textContent = "Player 1 Wins";
    turnDisplay.style.color = "red";
    p1Wins += 1;
  }

  buttons.forEach((button) =>{
    button.disabled = true;
  });
}

function reset(){
  buttons.forEach((button) =>{
    button.textContent = "";
    button.classList.remove("rowWin");
    button.classList.remove("colWin");
    button.classList.remove("diag1Win");
    button.classList.remove("diag2Win");
    button.disabled = false;
    numMoves = 0;
    whoseTurn = "p1";
  });
  turnDisplay.textContent = "Player 1's Turn";
  turnDisplay.style.color = "white";
}
