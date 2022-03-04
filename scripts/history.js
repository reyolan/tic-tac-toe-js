import { undoButton, redoButton, squares } from "./constant.js";
import { board, gameSequence } from "./game.js";
import { deleteFutureMovesInMoveList, highlightMove } from "./move-list.js";
import { adjustScore } from "./player.js";

//create object that will also log the score (para ma-undo mo rin yung score)
// const history = {
// boardState: [],
//   playerOneScore:0,
// playerTwoScore: 0,
// }

//lagay ka EventListener sa squares na kapag nag undo ka tapos nagclick ka na ng
//bagong turn lahat ng future indexes sa Array ay mawawala.

let undoState = false;

let boardHistory = [];
let turnNumber = -1;
function logBoardHistory() {
	boardHistory.push(board);
	turnNumber += 1;

	if (turnNumber > 0) highlightMove(turnNumber - 1);

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
	turnNumber -= 1;
	printUndoRedoBoard(turnNumber);
	toggleUndoRedoButton();

	if (turnNumber > 0) highlightMove(turnNumber - 1);

	//create an if else condition for winnerState variable to decrease score when won

	squares.forEach((square) => square.addEventListener("click", gameSequence));
}

function redoMove() {
	turnNumber += 1;
	printUndoRedoBoard(turnNumber);
	toggleUndoRedoButton();
	highlightMove(turnNumber - 1);
}

function removeFutureBoardStates() {
	boardHistory = boardHistory.slice(0, turnNumber + 1);
	deleteFutureMovesInMoveList(turnNumber);
	undoState = false;
}

function passBoardState() {
	return boardHistory[turnNumber];
}

function resetBoardHistory() {
	boardHistory = [];
	turnNumber = -1;
}

function toggleUndoRedoButton() {
	undoButton.disabled = turnNumber === 0 ? true : false;
	redoButton.disabled =
		boardHistory[turnNumber + 1] === undefined ? true : false;
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
