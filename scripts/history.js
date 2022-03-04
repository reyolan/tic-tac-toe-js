import { undoButton, redoButton, squares } from "./constant.js";
import { board, gameSequence } from "./game.js";
import { deleteFutureMovesInMoveList, highlightMove } from "./move-list.js";
import { adjustScore } from "./player.js";

//create object that will also log the score (para ma-undo mo rin yung score)
// const gameState = {
// boardState: [],
//   playerOneScore:0,
// playerTwoScore: 0,
// tieScore: 0
// } ---> tapos kada access ng index, ipiprint natin sa respective textContent

let undoState = false;

let boardHistory = [];
let turnCounter = -1;

function logBoardHistory() {
	boardHistory.push(board);
	turnCounter += 1;

	if (turnCounter > 0) highlightMove(turnCounter - 1);

	toggleUndoRedoButton();
}

// console.log(boardHistory);
// console.log(boardHistory[turnNumber]);
// console.log(turnNumber);

function printUndoRedoBoard(turnNumber) {
	const board = boardHistory[turnNumber].flat();

	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = board[i];
	}
}

function undoMove() {
	undoState = true;
	turnCounter -= 1;
	printUndoRedoBoard(turnCounter);
	toggleUndoRedoButton();

	if (turnCounter > 0) highlightMove(turnCounter - 1);

	//create an if else condition for winnerState (from game.js) variable to decrease score when already won,
	//store mo rin sa variable inside game.js kung sino nanalo para ma - input sa decrementScore kung sino idedecrement.

	squares.forEach((square) => square.addEventListener("click", gameSequence));
}

function redoMove() {
	turnCounter += 1;
	printUndoRedoBoard(turnCounter);
	toggleUndoRedoButton();
	highlightMove(turnCounter - 1);
}

function removeFutureBoardStates() {
	boardHistory = boardHistory.slice(0, turnCounter + 1);
	deleteFutureMovesInMoveList(turnCounter);
	undoState = false;
}

function passBoardState() {
	return boardHistory[turnCounter];
}

function resetBoardHistory() {
	boardHistory = [];
	turnCounter = -1;
}

function toggleUndoRedoButton() {
	undoButton.disabled = turnCounter === 0 ? true : false;
	redoButton.disabled =
		boardHistory[turnCounter + 1] === undefined ? true : false;
}

const undoRedoEvent = () => {
	undoButton.addEventListener("click", undoMove);
	redoButton.addEventListener("click", redoMove);
};

export {
	logBoardHistory,
	undoRedoEvent,
	resetBoardHistory,
	passBoardState,
	removeFutureBoardStates,
	toggleUndoRedoButton,
	undoState,
};
