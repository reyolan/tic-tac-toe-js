import { squares, restartButton, playerTurnIndicator } from "./constant.js";
import { turnIndicator, resetIndicator } from "./turn-indicator.js";
import { logBoardHistory, resetBoardHistory } from "./history.js";
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

	const remainingTurn = board.flat().filter((element) => element === "").length;
	// turnIndicator(playerTurnIndicator[0]);
	// turnIndicator(playerTurnIndicator[2]);

	if (remainingTurn % 2 !== 0) {
		printTurn(e, playerOne.mark);

		if (isWinner(playerOne.mark)) {
			incrementScore(playerOne);
			return;
		}
	} else {
		printTurn(e, playerTwo.mark);

		if (isWinner(playerTwo.mark)) {
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

	logBoardHistory();
}

function checkColumn(mark) {
	const flatBoard = board.flat();
	const columnOne = flatBoard.filter((_, i) => i % 3 === 0);
	const columnTwo = flatBoard.slice(1, 9).filter((_, i) => i % 3 === 0);
	const columnThree = flatBoard.slice(2, 9).filter((_, i) => i % 3 === 0);

	if (isMatchWithPattern([columnOne, columnTwo, columnThree], mark))
		return true;
}

function checkRow(mark) {
	if (isMatchWithPattern(board, mark)) return true;
}

function checkDiagonal(mark) {
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

function isWinner(mark) {
	if (checkColumn(mark) || checkRow(mark) || checkDiagonal(mark)) {
		announceWinner();

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

	board = [flatBoard.slice(0, 3), flatBoard.slice(3, 6), flatBoard.slice(6, 9)];
}

function restartGame() {
	squares.forEach((square) => {
		square.textContent = "";
		// square.addEventListener("click", gameSequence, { once: true });
	});

	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	resetBoardHistory();
	logBoardHistory();

	// resetIndicator(playerTurnIndicator[0]);
	// resetIndicator(playerTurnIndicator[2]);
	// turnIndicator(playerTurnIndicator[0]);
}

const inGameEvent = () => {
	squares.forEach(
		(square) => square.addEventListener("click", gameSequence) // , { once: true }
	);
	restartButton.addEventListener("click", restartGame);
};

export { inGameEvent, restartGame, board };
