
/*
1: Choose ‘Rock’, ‘Paper’ or ‘Scissors’
3: Computer choose a random ‘Rock’, ‘Paper’ or ‘Scissors’
4: Match: IF/ELSE
    Rock > Scissors
    Paper > Rock
    Siccors > Paper
5: Log: You win/lose
*/



function getComputerChoice () {
    //Get a random number between 0 and 2
    const computerChoice = Math.floor(Math.random() * 3);

    if (computerChoice == 0){
        return "rock";
    } else if (computerChoice == 1){
        return "paper"; 
    } else {
        return "scissor";
    }
};

function playRound(playerSelection, computerSelection, pointP, pointC) {

    if (computerSelection == "rock" && playerSelection == "rock" || 
            computerSelection == "paper" && playerSelection == "paper" || 
            computerSelection == "scissor" && playerSelection == "scissor"){
                return {
                    pointP: pointP,
                    pointC: pointC,
                    text: "DRAW! " + playerSelection + " equals " + computerSelection
                };
    } else if (computerSelection == "paper" && playerSelection == "rock" || 
            computerSelection == "scissor" && playerSelection == "paper" || 
            computerSelection == "rock" && playerSelection == "scissor"){
                return {
                    pointP: pointP,
                    pointC: pointC + 1,
                    text: "YOU LOSE! " + computerSelection + " beats " + playerSelection
                };
    } else if(computerSelection == "rock" && playerSelection == "paper" || 
            computerSelection == "paper" && playerSelection == "scissor" || 
            computerSelection == "scissor" && playerSelection == "rock"){
                return {
                    pointP: pointP + 1,
                    pointC: pointC,
                    text: "YOU WIN! " + playerSelection + " beats " + computerSelection
                };
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



function game(){
    // Set default start points
    /*let playerPoints = 0,
        computerPoints = 0; */

    /* - Overwritw start variables, because they set back to 0 after each round, because playRound() arguments was defined as (..., playerPoints, computerPoints)
       - Solution: Declare start points as objetct return  
                    pointP: playerPoints, TO pointP: pointP,
                    pointC: computerPoints,TO pointC: pointC,
    */

    let pointP = 0,
        pointC = 0; 
    
    //Define 5 Rounds
    for (i=0; i<5; i++){
    
        //Loop
        console.log('Loop: ',i);
        
        //Player choose selection & Save player selection in variable and set all chars to lowerCase. 
        let playerSelection = prompt("Please select rock, paper or scissor: ").toLowerCase();
        console.log('PlayerCoice: ', playerSelection);

        //Every loop computer choose a random selection. 
        //save result from getcomputerChoice to computerSelection var.
        let computerSelection = getComputerChoice();
        console.log('ComputerChoice:', computerSelection);
        
        //Start playRound and set arguments. 
        //Save the return (return is a object) from playRound in a variable namend decision.
        //Console.log win/loss after each round with points and text. 
        let decision = playRound(playerSelection, computerSelection, pointP, pointC);
        console.log(decision.text + ' Points: Computer ' + decision.pointC,'Player ' + decision.pointP);

        //Place new score back to start variables
        pointP = decision.pointP;
        pointC = decision.pointC;
    }
    //Report Winner and score at the end 
    console.log("Thanks for playing"); 

    if(pointC > pointP){
        console.log("Sry, you lose! Try again")
    } else {
        console.log("Congratulation! You win the game")
    };
};

game();
