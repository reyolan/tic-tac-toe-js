import { squares } from "./constant.js";

let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

//get the querySelectorAll of square
//flatten the board para same lang sila ng sequence kapag naglagay ng turn
//i-track kung pang ilang square yung pinindot, then ayun din yun ilalagay sa boardArray na nakaflat,
//create the board again with array of arrays tapos i-assign sa variable na board

//print to DOM

function gameSequence(e) {
	const remainingTurn = board.flat().filter((element) => element === "").length;

	if (remainingTurn % 2 !== 0) {
		printTurn(e, "X");
		if (isWinner("X")) return;
	} else {
		printTurn(e, "O");
		if (isWinner("O")) return;
	}

	if (remainingTurn === 1) {
		console.log("DRAW!");
	}
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
	console.log("Winner!");
}

function printTurn(e, mark) {
	const index = [...e.target.parentElement.children].indexOf(e.target);
	let flatBoard = board.flat();
	e.target.textContent = mark;
	flatBoard[index] = mark;

	board = [];
	board.push(flatBoard.slice(0, 3));
	board.push(flatBoard.slice(3, 6));
	board.push(flatBoard.slice(6, 9));
}

const inGameEvent = () => {
	squares.forEach((square) =>
		square.addEventListener("click", gameSequence, { once: true })
	);
};

export { inGameEvent };
