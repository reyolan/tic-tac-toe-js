import { undoButton, redoButton, squares } from "./constant.js";
import { board } from "./game.js";

let boardHistory = [];

let turnNumber = -1;

//flatten the array and then match the textContent of the squares

function logBoardHistory() {
	boardHistory.push(board);
	turnNumber += 1;
	// console.log(boardHistory[turnNumber]);
	// console.log(turnNumber);
}

function printUndoRedoBoard(turnNumber) {
	const board = boardHistory[turnNumber].flat();
	console.log(turnNumber);

	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = board[i];
	}
}

function undoMove(e) {
	turnNumber -= 1;
	printUndoRedoBoard(turnNumber);
	if (turnNumber === -1) {
		e.target.disabled = true;
	}
}

function redoMove() {
	turnNumber += 1;
	printUndoRedoBoard(turnNumber);

	if (turnNumber !== -1) {
		undoButton.disabled = false;
	}
}

function changeMove() {
	turnNumber += 1;
}

// function togglePrevAndNextButton() {
// 	prevButton.classList.toggle("-hide");
// 	nextButton.classList.toggle("-hide");
// }

function resetBoardHistory() {
	boardHistory = [];
	turnNumber = -1;
}

const undoRedoEvent = () => {
	undoButton.addEventListener("click", undoMove);
	redoButton.addEventListener("click", redoMove);
};

export { logBoardHistory, undoRedoEvent, resetBoardHistory };
