
/*
1: Choose ‘Rock’, ‘Paper’ or ‘Scissors’
2: Klick start
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

function playRound(playerSelection, computerSelection) {
    
    if (computerSelection == "rock" && playerSelection == "rock" || computerSelection == "paper" && playerSelection == "paper" || computerSelection == "scissor" && playerSelection == "scissor"){
        return "DRAW! " + playerSelection + " equals " + computerSelection;
    } else if (computerSelection == "paper" && playerSelection == "rock" || computerSelection == "scissor" && playerSelection == "paper" || computerSelection == "rock" && playerSelection == "scissor"){
        return "YOU LOSE! " + computerSelection + " beats " + playerSelection; 
    } 
    else if(computerSelection == "rock" && playerSelection == "paper" || computerSelection == "paper" && playerSelection == "scissor" || computerSelection == "scissor" && playerSelection == "rock"){
        return "YOU WIN! " + playerSelection + " beats " + computerSelection;
    }
    else if(playerSelection !== "paper" || playerSelection !== "rock" || playerSelection !== "scissor"){
        return "FUCK YOU! Select a right one!"
    }
}

function game(){
    //Define 5 Rounds
    for (i=0; i<5; i++){
        
        //Loop
        console.log(i);

        //Player choose selection & Save player selection in variable and set all chars to lowerCase. 
        const playerSelection = prompt("Please select rock, paper or scissors: ").toLowerCase();
        console.log(playerSelection);

        //Every loop computer choose a random selection. 
        //save result from getcomputerChoice to computerSelection var.
        const computerSelection = getComputerChoice();

        //Report winner and loser after one round
        console.log('ComputerChoice:', computerSelection);
        console.log(playRound(playerSelection, computerSelection));
    }
    //Report Winner and score at the end 
}

game();
