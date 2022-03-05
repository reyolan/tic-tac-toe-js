import { squares, restartButton, playerTurnIndicator } from "./constant.js";
import {
	changeScoreFromState,
	playerOne,
	playerTwo,
	tieScore,
} from "./player.js";
import { turnIndicator, resetIndicator } from "./turn-indicator.js";
import {
	logGameState,
	resetBoardHistory,
	passBoardState,
	undoState,
	removeFutureBoardStates,
	gameHistory,
	incrementScore,
} from "./history.js";

import { addToMoveList, clearMoveList } from "./move-list.js";

let board;
initializeBoard();

let winnerState = false;
//print to DOM

function gameSequence(e) {
	if (e.target.textContent !== "") return;

	if (undoState) {
		removeFutureBoardStates();
	}

	board = passBoardState();

	const remainingTurn = board.flat().filter((element) => element === "").length;

	// turnIndicator(playerTurnIndicator[0]);
	// turnIndicator(playerTurnIndicator[2]);

	if (remainingTurn % 2 !== 0) {
		printTurn(e, playerOne.mark);

		if (isWinner(board, playerOne.mark)) {
			// adjustScore("increment", playerOne);
			incrementScore("playerOneScore");
			return;
		}
	} else {
		printTurn(e, playerTwo.mark);

		if (isWinner(board, playerTwo.mark)) {
			incrementScore("playerTwoScore");
			// adjustScore("increment", playerTwo);
			return;
		}
	}

	if (remainingTurn === 1) {
		// resetIndicator(playerTurnIndicator[0]);
		// resetIndicator(playerTurnIndicator[2]);
		// adjustScore("increment");
		incrementScore();
		console.log("DRAW!");
	}
}

function checkColumn(board, mark) {
	const flatBoard = board.flat();
	const columnOne = flatBoard.filter((_, i) => i % 3 === 0);
	const columnTwo = flatBoard.slice(1).filter((_, i) => i % 3 === 0);
	const columnThree = flatBoard.slice(2).filter((_, i) => i % 3 === 0);

	if (isMatchWithPattern([columnOne, columnTwo, columnThree], mark))
		return true;
}

function checkRow(board, mark) {
	if (isMatchWithPattern(board, mark)) return true;
}

function checkDiagonal(board, mark) {
	const flatBoard = board.flat();
	const diagonalOne = flatBoard.filter((_, i) => i % 4 === 0);
	const diagonalTwo = flatBoard.slice(2, 8).filter((_, i) => i % 2 === 0);

	if (isMatchWithPattern([diagonalOne, diagonalTwo], mark)) return true;
}

function isMatchWithPattern(board, mark) {
	for (let i = 0; i < board.length; i++) {
		if (board[i].every((element) => element === mark)) return true;
	}
}

function isWinner(board, mark) {
	if (
		checkColumn(board, mark) ||
		checkRow(board, mark) ||
		checkDiagonal(board, mark)
	) {
		announceWinner();
		winnerState = true;
		return true;
	}
}

function announceWinner() {
	squares.forEach((square) =>
		square.removeEventListener("click", gameSequence)
	);
	//add classList here that will show who wins
	console.log("Winner!");
}

function printTurn(e, mark) {
	const index = [...e.target.parentElement.children].indexOf(e.target);
	let flatBoard = board.flat();
	e.target.textContent = mark;
	flatBoard[index] = mark;

	addToMoveList(index, mark);

	board = [flatBoard.slice(0, 3), flatBoard.slice(3, 6), flatBoard.slice(6)];
	logGameState({
		board: board,
		playerOneScore: playerOne.score,
		playerTwoScore: playerTwo.score,
		tieScore: tieScore,
	});
}

function restartGame() {
	// lagay lang ng winnerState variable?
	// ilagay kaya natin sa player.js tapos import from history.js yung gameHistory(?) para machange talaga yung score since bawal ka magre-assign.
	if (winnerState && !undoState) {
		changeScoreFromState(
			gameHistory[gameHistory.length - 1].playerOneScore,
			gameHistory[gameHistory.length - 1].playerTwoScore,
			gameHistory[gameHistory.length - 1].tieScore
		);
		winnerState = false;
	}

	resetBoardHistory();
	clearMoveList();
	initializeBoard();

	squares.forEach((square) => {
		square.textContent = "";
		square.addEventListener("click", gameSequence);
	});

	// resetIndicator(playerTurnIndicator[0]);
	// resetIndicator(playerTurnIndicator[2]);
	// turnIndicator(playerTurnIndicator[0]);
}

function initializeBoard() {
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	logGameState({
		board: board,
		playerOneScore: playerOne.score,
		playerTwoScore: playerTwo.score,
		tieScore: tieScore,
	});
}

// function undoWinner() {
// 	winner = false;
// 	squares.forEach((square) => square.addEventListener("click", gameSequence));
// 	//decrement score
// }

const inGameEvent = () => {
	squares.forEach((square) => square.addEventListener("click", gameSequence));

	restartButton.addEventListener("click", restartGame);
};

export { inGameEvent, restartGame, board, gameSequence };
