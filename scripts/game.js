import { squares, restartButton, playerTurnIndicator } from "./constant.js";
import { turnIndicator, resetIndicator } from "./turn-indicator.js";
import {
	logBoardHistory,
	resetBoardHistory,
	passBoardState,
	undoState,
	removeFutureMoves,
} from "./history.js";
import { incrementScore, playerOne, playerTwo } from "./player.js";

let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

logBoardHistory();

//print to DOM

function gameSequence(e) {
	if (e.target.textContent !== "") return;

	if (undoState) {
		removeFutureMoves();
	}

	board = passBoardState();

	const remainingTurn = board.flat().filter((element) => element === "").length;

	// turnIndicator(playerTurnIndicator[0]);
	// turnIndicator(playerTurnIndicator[2]);

	if (remainingTurn % 2 !== 0) {
		printTurn(e, playerOne.mark);
		logBoardHistory();
		//check for future move

		if (isWinner(board, playerOne.mark)) {
			incrementScore(playerOne);
			return;
		}
	} else {
		printTurn(e, playerTwo.mark);
		logBoardHistory();

		if (isWinner(board, playerTwo.mark)) {
			incrementScore(playerTwo);
			return;
		}
	}

	if (remainingTurn === 1) {
		// resetIndicator(playerTurnIndicator[0]);
		// resetIndicator(playerTurnIndicator[2]);

		incrementScore();
		console.log("DRAW!");
	}
}

function checkColumn(board, mark) {
	const flatBoard = board.flat();
	const columnOne = flatBoard.filter((_, i) => i % 3 === 0);
	const columnTwo = flatBoard.slice(1, 9).filter((_, i) => i % 3 === 0);
	const columnThree = flatBoard.slice(2, 9).filter((_, i) => i % 3 === 0);

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

		return true;
	}
}

function announceWinner() {
	squares.forEach((square) =>
		square.removeEventListener(
			"click",
			square.addEventListener("click", (e) => {
				gameSequence(e);
			})
		)
	);
	//add classList here that will show who wins
	console.log("Winner!");
}

function printTurn(e, mark) {
	const index = [...e.target.parentElement.children].indexOf(e.target);
	let flatBoard = board.flat();
	e.target.textContent = mark;
	flatBoard[index] = mark;

	board = [flatBoard.slice(0, 3), flatBoard.slice(3, 6), flatBoard.slice(6, 9)];
}

function restartGame() {
	squares.forEach((square) => {
		square.textContent = "";
		square.addEventListener("click", (e) => {
			gameSequence(e);
		});
	});

	resetBoardHistory();
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	logBoardHistory();

	// resetIndicator(playerTurnIndicator[0]);
	// resetIndicator(playerTurnIndicator[2]);
	// turnIndicator(playerTurnIndicator[0]);
}

// function undoWinner() {
// 	winner = false;
// 	squares.forEach((square) => square.addEventListener("click", gameSequence));
// 	//decrement score
// }

const inGameEvent = () => {
	squares.forEach(
		(square) =>
			square.addEventListener("click", (e) => {
				gameSequence(e);
			}) // , { once: true }
	);
	restartButton.addEventListener("click", restartGame);
};

export { inGameEvent, restartGame, board };
