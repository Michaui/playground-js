
// /*
// 1: Choose ‘Rock’, ‘Paper’ or ‘Scissors’
// 3: Computer choose a random ‘Rock’, ‘Paper’ or ‘Scissors’
// 4: Match: IF/ELSE
//     Rock > Scissors
//     Paper > Rock
//     Siccors > Paper
// 5: Log: You win/lose
// */

// Version 1.0 => Game started by Eventhandler 
// function game(){

//     //Define 5 Rounds
//     for (i=0; i<5; i++){
//         // "use strict"

// Version 1.0 => Not necessery anymore
//         //Loop
//         console.log('Loop: ',i);
        
// Version 1.0 => Player choose a selection now from a Button Panel 
//         //Player choose selection & Save player selection in variable and set all chars to lowerCase. 
//         // let playerSelection = prompt("Please select rock, paper or scissor: ").toLowerCase();
//         console.log('PlayerCoice: ', playerSelection);

        
// Version 1.0 => After 5 Round place results 
//     //Report Winner and score at the end 
//     console.log("Thanks for playing"); 

//     if(pointC > pointP){
//         console.log("Sry, you lose! Try again")
//     } else {
//         console.log("Congratulation! You win the game")
//     };
// };

// Version 1.0 => 
// game();

// ------ NEW VERSION 2.0 ------

// Set default start points
/*let playerPoints = 0,
    computerPoints = 0; */

/* - Overwritw start variables, because they set back to 0 after each round, because playRound() arguments was defined as (..., playerPoints, computerPoints)
   - Solution: Declare start points as objetct return  
                pointP: playerPoints, TO pointP: pointP,
                pointC: computerPoints,TO pointC: pointC,
*/
// const background = document.getElementById('#background');



// Erforderlich, dass die Global sind weil in Funktion playRound() und gameover() verwendet wird. 
const dialog = document.querySelector('#dialog');
const dialogtext = document.querySelector("h2"); 

//againBtn vor dem Spiel ausblenden. Am ende des Spiels anzeigen. 
const againbtn = document.querySelector('.againBtn');
againbtn.style.display='none'; 

//Splashscreen kurz anzeigen 
splashscreen(); 

// Set default start variables
let pointP = 5,
    pointC = 5;


// 01: Funktion, die aufgerufen wird, wenn ein Button im Panel geklickt wird
function handleButtonClick(buttonId) {

    // Elemente aus dem DOM auswählen
    const leftside = document.querySelector('#leftside');
    const rightside = document.querySelector('#rightside');

    // Animation stoppen bis Timeout() es wieder startet. 
    leftside.style.animation = 'none';
    rightside.style.animation = 'none';
    dialog.style.display='none';
    

    // Every loop computer choose a random selection. 
    //save result from getcomputerChoice to computerSelection var.
    let computerSelection = getComputerChoice();
    console.log('ComputerChoice:', computerSelection);


    // Je nach geklicktem Button das Bild austauschen und Variable für playRound() definieren
    if (buttonId === 'leftbtn') {
      leftside.style.backgroundImage = 'url("./img/p_rock.png")';
      playerSelection = "rock"; 
    } else if (buttonId === 'centertbtn') {
      leftside.style.backgroundImage = 'url("./img/p_scissor.png")';
      playerSelection = "scissor"; 
    } else if (buttonId === 'rightbtn') {
      leftside.style.backgroundImage = 'url("./img/p_paper.png")';
      playerSelection = "paper"; 
    }

    //Start playRound and set arguments. 
    //Save the return (return is a object) from playRound in a variable namend decision.
    //Console.log win/loss after each round with points and text. 
    let decision = playRound(playerSelection, computerSelection, pointP, pointC);
    console.log(decision.text + ' Points: Computer ' + decision.pointC,'Player ' + decision.pointP);

    //Place new score back to start variables
    pointP = decision.pointP;
    pointC = decision.pointC;
    
    // Timeout, um die Animation nach einer Verzögerung wieder starten wenn kein Spieler auf 0 ist. 
    if(pointC == 0 || pointP == 0){
        // Animation stoppen
        setTimeout(() => {
            // Animation erneut starten
            leftside.style.animation = 'none';
            rightside.style.animation = 'none';
            }, 2000);
    }else{
        setTimeout(() => {
            // Animation erneut starten
            leftside.style.animation = 'shake 0.9s linear infinite reverse';
            rightside.style.animation = 'shake 0.9s linear infinite reverse';
            leftside.style.backgroundImage = 'url("./img/p_rock.png")';
            rightside.style.backgroundImage = 'url("./img/c_rock.png")';
            dialogtext.innerHTML = "Select next one"; 
            dialog.style.display='flex';
            }, 1500);
        };

    //If someone have no life, game ends. 
    gameover(pointP,pointC);
}
  

  // 0: Event-Listener für die Button-Elemente hinzufügen
  document.querySelector('#leftbtn').addEventListener('click', () => handleButtonClick('leftbtn'));
  document.querySelector('#centertbtn').addEventListener('click', () => handleButtonClick('centertbtn'));
  document.querySelector('#rightbtn').addEventListener('click', () => handleButtonClick('rightbtn'));


// Random computer selction function
function getComputerChoice () {
    //Get a random number between 0 and 2
    const computerChoice = Math.floor(Math.random() * 3);

    if (computerChoice == 0){
        rightside.style.backgroundImage = 'url("./img/c_rock.png")';
        return "rock";
    } else if (computerChoice == 1){
        rightside.style.backgroundImage = 'url("./img/c_paper.png")';
        return "paper"; 
    } else {
        rightside.style.backgroundImage = 'url("./img/c_scissor.png")';
        return "scissor";
    }
};


// Function choose winner & set points
function playRound(playerSelection, computerSelection, pointP, pointC) {
    // Decleration left & right life hearts, if this round someone lose. 
    let rh = document.querySelectorAll('#rh');
    let lh = document.querySelectorAll('#lh');

    if (computerSelection == "rock" && playerSelection == "rock" || 
            computerSelection == "paper" && playerSelection == "paper" || 
            computerSelection == "scissor" && playerSelection == "scissor"){
                //Stelle den Modal wieder kurz dar, mit Inhalt ob WIN, LOSE oder DRAW
                setTimeout(() => {
                    dialogtext.innerHTML = "DRAW"; 
                    dialog.style.display='flex';
                }, 800);

                return {
                    pointP: pointP,
                    pointC: pointC,
                    text: "DRAW! " + playerSelection + " equals " + computerSelection
                };
    } else if (computerSelection == "paper" && playerSelection == "rock" || 
            computerSelection == "scissor" && playerSelection == "paper" || 
            computerSelection == "rock" && playerSelection == "scissor"){
                setTimeout(() => {
                    dialogtext.innerHTML = "LOST"; 
                    dialog.style.display='flex';
                }, 800);
                // Delete one life and return results
                if(pointP == 4){
                    lh[4].style.display="none";
                } else if(pointP == 3){
                    lh[3].style.display="none";
                }
                else if(pointP == 2){
                    lh[2].style.display="none";
                }
                else if(pointP == 1){
                    lh[1].style.display="none";
                }
                else {
                    lh[0].style.display="none";
                }

                return {
                    pointP: pointP - 1,
                    pointC: pointC,
                    text: "YOU LOSE! " + computerSelection + " beats " + playerSelection
                };
    } else if(computerSelection == "rock" && playerSelection == "paper" || 
            computerSelection == "paper" && playerSelection == "scissor" || 
            computerSelection == "scissor" && playerSelection == "rock"){
                setTimeout(() => {
                    dialogtext.innerHTML = "WIN"; 
                    dialog.style.display='flex';
                }, 800);
                // Delete one life and return results
                if(pointC == 4){
                    rh[4].style.display="none";
                } else if(pointC == 3){
                    rh[3].style.display="none";
                }
                else if(pointC == 2){
                    rh[2].style.display="none";
                }
                else if(pointC == 1){
                    rh[1].style.display="none";
                }
                else {
                    rh[0].style.display="none";
                }

                return {
                    pointP: pointP,
                    pointC: pointC - 1,
                    text: "YOU WIN! " + playerSelection + " beats " + computerSelection
                };
    // Not important anymore 
    } else if(playerSelection !== "paper" || 
            playerSelection !== "rock" || 
            playerSelection !== "scissor"){
                return {
                    pointP: pointP,
                    pointC: pointC,
                    text: "FUCK! Select a right one!"
                };
    };
};


function gameover(statP,statC){
    const buttonPanel = document.querySelector('#buttonpanel');

    switch(true){
        case statP == 0:
            // Timout notwendig da es sonst von playRound (setTimout Dialog) überschrieben wird
            setTimeout(() => {
                // console.log("Spielende - Du hast verloren!");
                // Passe die Höhe und Breite im letzten ausgeführten Dialog an
                dialog.style.cssText ="width: 30%; height: 17%;"
                dialogtext.innerHTML = 'Haha! Loooser!'; 
                dialog.style.display="flex"; 
                buttonPanel.style.display="none";
                againbtn.style.display='flex'; 
            }, 810);
            break;
        case statC == 0:
            // Timout notwendig da es sonst von playRound (setTimout Dialog) überschrieben wird
            setTimeout(() => {
                // console.log("Spielende - Du hast gewonnen!");
                // Passe die Höhe und Breite im letzten ausgeführten Dialog an
                dialog.style.cssText ="width: 30%; height: 17%;"
                dialog.style.display="flex"; 
                dialogtext.innerHTML = "Winner winner, chicken dinner"; 
                buttonPanel.style.display="none";
                againbtn.style.display='flex'; 
            }, 810);
            break;
        default:
            console.log("Spiel läuft weiter.");
    }
};

function splashscreen (){
    const loadscreen = document.createElement('div');
    const body = document.body;
    
    loadscreen.classList.add('loadscreen');
    loadscreen.textContent = 'SNIG, SNAG, SNUG!';
    body.append(loadscreen);
    setTimeout (() => {
        loadscreen.classList.remove('loadscreen');
    },2000);
}
