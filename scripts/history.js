import { undoButton, redoButton, squares } from "./constant.js";
import { board } from "./game.js";

//create object that will also log the score (para ma-undo mo rin yung score)
// const history = {
// boardState: [],
//   playerOneScore:0,
// playerTwoScore: 0,
// }

//lagay ka EventListener sa squares na kapag nag undo ka tapos nagclick ka na ng bagong turn lahat ng future indexes sa Array ay mawawala.

let boardHistory = [];

let turnNumber = -1;
let undoState = false;

function logBoardHistory() {
	boardHistory.push(board);
	turnNumber += 1;
	console.log(boardHistory);
	// console.log(boardHistory[turnNumber]);
	// console.log(turnNumber);
}

function printUndoRedoBoard(turnNumber) {
	const board = boardHistory[turnNumber].flat();

	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = board[i];
	}
}

function undoMove(e) {
	undoState = true;
	turnNumber -= 1;
	printUndoRedoBoard(turnNumber);
	if (turnNumber === -1) {
		e.target.disabled = true;
	}
}

function redoMove() {
	turnNumber += 1;
	printUndoRedoBoard(turnNumber);
	console.log("redomove", boardHistory);

	if (turnNumber !== -1) {
		undoButton.disabled = false;
	}
}

function removeFutureMoves() {
	boardHistory = boardHistory.slice(0, turnNumber + 1);
	undoState = false;
}

function passBoardState() {
	return boardHistory[turnNumber];
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

export {
	logBoardHistory,
	undoRedoEvent,
	resetBoardHistory,
	passBoardState,
	removeFutureMoves,
	undoState,
};
