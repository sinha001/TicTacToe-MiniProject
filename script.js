/*
Day 8: Mini Project --> Tic Tac Toe Game

- Created a structure and styling for the game in HTML/CSS.
- Using buttons for each box in the Tic Tac Toe grid.
- Logic to handle player turns (Player X and Player O).
- Reset and New Game functionality included.
- Checks for a winner after every turn.
*/

// Selecting all necessary DOM elements
let boxes = document.querySelectorAll(".box"); // All grid buttons
let resetBtn = document.querySelector("#reset-btn"); // Button to reset the game
let newGameBtn = document.querySelector("#new-btn"); // Button to start a new game
let msgContainer = document.querySelector(".msg-container"); // Container for the winner message
let msg = document.querySelector("#msg"); // Message to display the winner

// Variable to track turns (true for Player O, false for Player X)
let turnO = true;

// Winning patterns based on grid indices
const winningPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal (Top left to bottom right)
  [1, 4, 7], // Middle column
  [2, 4, 6], // Diagonal (Top right to bottom left)
  [2, 5, 8], // Right column
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

/* 
Function to reset the game state
- Resets turn to Player O
- Enables all boxes
- Hides the winner message
*/
const resetGame = () => {
  turnO = true; // Reset to Player O's turn
  enableBoxes(); // Clear and enable all boxes
  msgContainer.classList.add("hide"); // Hide the winner message container
};

/* 
Adding click event listeners to each box
- Updates the box with "O" or "X" based on the current turn
- Disables the clicked box
- Checks for a winner after every move
*/
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O"; // Player O's turn
      turnO = false; // Switch to Player X
    } else {
      box.innerText = "X"; // Player X's turn
      turnO = true; // Switch to Player O
    }
    box.disabled = true; // Disable the box after it's clicked
    checkWinner(); // Check if the game has a winner
  });
});

/* 
Function to disable all boxes
- Used when the game ends (winner is declared)
*/
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // Disable each box
  }
};

/* 
Function to enable all boxes and clear their content
- Used when the game is reset or restarted
*/
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable each box
    box.innerText = ""; // Clear the content of the box
  }
};

/* 
Function to display the winner message
- Shows the winner's symbol (O or X)
- Makes the message container visible
*/
const showWinner = (winner) => {
  msg.innerText = `Winner: ${winner}`; // Display winner's name
  msg.style.color = "green"; // Set the text color to green
  msgContainer.classList.remove("hide"); // Show the message container
};

/* 
Function to check if there is a winner
- Compares the values of each winning pattern
- If all three boxes in a pattern match, declares the winner
*/
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText; // Value of the first position in the pattern
    let pos2Val = boxes[pattern[1]].innerText; // Value of the second position in the pattern
    let pos3Val = boxes[pattern[2]].innerText; // Value of the third position in the pattern

    // Check if all three positions are filled and match
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val); // Log the winner
        disableBoxes(); // Disable further moves
        showWinner(pos1Val); // Display the winner
      }
    }
  }
};

// Adding event listeners to reset and new game buttons
newGameBtn.addEventListener("click", resetGame); // Resets the game state for a new game
resetBtn.addEventListener("click", resetGame); // Clears the game state
