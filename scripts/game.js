import {
	squares,
	restartButton,
	playerTurnIndicator,
	modalWinner,
	winnerText,
	continueButton,
} from "./constant.js";
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
	removeFutureGameStates,
	gameHistory,
	incrementScore,
} from "./history.js";

import { addToMoveList, clearMoveList } from "./move-list.js";

let board;
initializeBoard();

let winnerState = false;

function gameSequence(e) {
	if (e.target.textContent) return;

	if (undoState) {
		removeFutureGameStates();
	}

	board = passBoardState();
	const remainingTurn = board.flat().filter((element) => element === "").length;
	turnIndicator(playerTurnIndicator[0], playerTurnIndicator[2]);

	if (remainingTurn % 2 !== 0) {
		printTurn(e, playerOne.mark);

		if (isWinner(board, playerOne.mark, playerOne.name)) {
			incrementScore("playerOneScore");
			return;
		}
	} else {
		printTurn(e, playerTwo.mark);

		if (isWinner(board, playerTwo.mark, playerTwo.name)) {
			incrementScore("playerTwoScore");
			return;
		}
	}

	if (remainingTurn === 1) {
		incrementScore();
		announceWinner();
	}
}

function isMatchWithPattern(board, mark) {
	const flatBoard = board.flat();
	const columnOne = flatBoard.filter((_, i) => i % 3 === 0);
	const columnTwo = flatBoard.slice(1).filter((_, i) => i % 3 === 0);
	const columnThree = flatBoard.slice(2).filter((_, i) => i % 3 === 0);
	const diagonalOne = flatBoard.filter((_, i) => i % 4 === 0);
	const diagonalTwo = flatBoard.slice(2, 8).filter((_, i) => i % 2 === 0);
	const rowOne = board[0];
	const rowTwo = board[1];
	const rowThree = board[2];

	const boardPatterns = [
		columnOne,
		columnTwo,
		columnThree,
		diagonalOne,
		diagonalTwo,
		rowOne,
		rowTwo,
		rowThree,
	];

	for (let i = 0; i < boardPatterns.length; i++) {
		if (boardPatterns[i].every((element) => element === mark)) return true;
	}
}

function isWinner(board, mark, name) {
	if (isMatchWithPattern(board, mark)) {
		announceWinner(mark, name);
		winnerState = true;
		return true;
	}
}

function announceWinner(mark = "", name = "") {
	squares.forEach((square) =>
		square.removeEventListener("click", gameSequence)
	);
	modalWinner.classList.remove("-hide");

	if (!mark && !name) {
		winnerText.textContent = "DRAW!";
		return;
	}
	winnerText.textContent = `${name} (${mark}) WINS!`;
}

function printTurn(e, mark) {
	const index = [...e.target.parentElement.children].indexOf(e.target);
	let flatBoard = board.flat();
	e.target.textContent = flatBoard[index] = mark;

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

	resetIndicator(playerTurnIndicator[0], playerTurnIndicator[2]);
	turnIndicator(playerTurnIndicator[0]);
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

const inGameEvent = () => {
	squares.forEach((square) => square.addEventListener("click", gameSequence));
	restartButton.addEventListener("click", restartGame);
	continueButton.addEventListener("click", () =>
		modalWinner.classList.add("-hide")
	);
};

export { inGameEvent, restartGame, gameSequence, board };
