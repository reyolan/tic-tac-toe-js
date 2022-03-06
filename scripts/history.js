import {
	undoButton,
	redoButton,
	squares,
	playerScore,
	playerTurnIndicator,
} from "./constant.js";
import { gameSequence, winnerState } from "./game.js";
import { turnIndicator } from "./turn-indicator.js";

import { deleteFutureMovesInMoveList, highlightMove } from "./move-list.js";

let undoState = false;
let gameHistory = [];
let turnCounter = -1;

function logGameState(gameState) {
	gameHistory.push(gameState);
	turnCounter += 1;

	if (turnCounter > 0) highlightMove(turnCounter - 1);

	toggleUndoRedoButton();
}

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

	squares.forEach((square) => square.addEventListener("click", gameSequence));
	turnIndicator(playerTurnIndicator[0], playerTurnIndicator[2]);
}

function redoMove() {
	turnCounter += 1;
	printPresentGameState(turnCounter);
	toggleUndoRedoButton();
	highlightMove(turnCounter - 1);

	if (winnerState)
		squares.forEach((square) =>
			square.removeEventListener("click", gameSequence)
		);
	turnIndicator(playerTurnIndicator[0], playerTurnIndicator[2]);
}

function removeFutureGameStates() {
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
	removeFutureGameStates,
	toggleUndoRedoButton,
	incrementScore,
	gameHistory,
	undoState,
};
