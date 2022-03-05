import { undoButton, redoButton, squares, playerScore } from "./constant.js";
import { gameSequence } from "./game.js";

import { deleteFutureMovesInMoveList, highlightMove } from "./move-list.js";

//create object that will also log the score (para ma-undo mo rin yung score)
// const gameState = {
// boardState: [],
//   playerOneScore:0,
// playerTwoScore: 0,
// tieScore: 0
// } ---> tapos kada access ng index, ipiprint natin sa respective textContent

//let's say we have [ {...}, {...}], at the last index, we shall have a condition,
//if (winner && nagclick ng restart) --> doon iincrement yung totoong score.

//don sa mismong game, magincrement ka palang sa score sa mismong state pa lang,
//wag muna sa mismong variable na totoong score, which the playerOne.score and playerTwo.score and tieScore

//Kada new game, kukunin mo yung initial state score sa mismong playerOne.score, playerTwo.score and tieScore

// dapat ang pinupush mo sa gameState ay isang object {board: [], playerOneScore, playerTwoScore, tieScore}
let undoState = false;

let gameHistory = [];
let turnCounter = -1;

function logGameState(gameState) {
	gameHistory.push(gameState);
	turnCounter += 1;

	console.log(gameHistory);
	if (turnCounter > 0) highlightMove(turnCounter - 1);

	toggleUndoRedoButton();
}

// console.log(boardHistory);
// console.log(boardHistory[turnNumber]);
// console.log(turnNumber);

function printPresentGameState(turnCounter) {
	const state = gameHistory[turnCounter];

	const boardState = state.board.flat();

	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = boardState[i];
	}

	playerScore[0].textContent = state.playerOneScore;
	playerScore[1].textContent = state.tieScore;
	playerScore[2].textContent = state.playerTwoScore;
}

function undoMove() {
	undoState = true;
	turnCounter -= 1;
	printPresentGameState(turnCounter);
	toggleUndoRedoButton();

	if (turnCounter > 0) highlightMove(turnCounter - 1);

	//create an if else condition for winnerState (from game.js) variable to decrease score when already won,
	//store mo rin sa variable inside game.js kung sino nanalo para ma - input sa decrementScore kung sino idedecrement.

	squares.forEach((square) => square.addEventListener("click", gameSequence));
}

function redoMove() {
	turnCounter += 1;
	printPresentGameState(turnCounter);
	toggleUndoRedoButton();
	highlightMove(turnCounter - 1);
}

function removeFutureBoardStates() {
	gameHistory = gameHistory.slice(0, turnCounter + 1);
	deleteFutureMovesInMoveList(turnCounter);
	undoState = false;
}

function incrementScore(player = "tieScore") {
	gameHistory[gameHistory.length - 1][player] += 1;

	if (player === "playerOneScore") {
		playerScore[0].textContent = gameHistory[gameHistory.length - 1][player];
		return;
	}
	if (player === "playerTwoScore") {
		playerScore[2].textContent = gameHistory[gameHistory.length - 1][player];
		return;
	}

	playerScore[1].textContent = gameHistory[gameHistory.length - 1][player];
}

function passBoardState() {
	return gameHistory[turnCounter].board;
}

function resetBoardHistory() {
	gameHistory = [];
	turnCounter = -1;
}

function toggleUndoRedoButton() {
	undoButton.disabled = turnCounter === 0 ? true : false;
	redoButton.disabled =
		gameHistory[turnCounter + 1] === undefined ? true : false;
}

const undoRedoEvent = () => {
	undoButton.addEventListener("click", undoMove);
	redoButton.addEventListener("click", redoMove);
};

export {
	logGameState,
	undoRedoEvent,
	resetBoardHistory,
	passBoardState,
	removeFutureBoardStates,
	toggleUndoRedoButton,
	incrementScore,
	gameHistory,
	undoState,
};
