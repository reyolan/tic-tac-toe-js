import {
	inputNames,
	playerOneName,
	playerTwoName,
	playerScore,
} from "./constant.js";

//if we want to choose who will go first, create a function that will change playerOne.mark and playerTwo.mark
//create a tie score

const playerOne = {
	name: "",
	mark: "X",
	score: 0,
};

const playerTwo = {
	name: "",
	mark: "O",
	score: 0,
};

let tieScore = 0;

function getNameFromInput() {
	playerOne.name = playerOneName.textContent = inputNames[0].value;
	playerTwo.name = playerTwoName.textContent = inputNames[1].value;
}

function incrementScore(player = "tie") {
	if (player === "tie") {
		tieScore += 1;
		playerScore[1].textContent = tieScore;
		return;
	}

	player.score += 1;

	if (player === playerOne) {
		playerScore[0].textContent = player.score;
	} else {
		playerScore[2].textContent = player.score;
	}
}

function decrementScore(player = "tie") {
	if (player === "tie") {
		tieScore -= 1;
		playerScore[1].textContent = tieScore;
		return;
	}

	player.score -= 1;

	if (player === playerOne) {
		playerScore[0].textContent = player.score;
	} else {
		playerScore[2].textContent = player.score;
	}
}

function resetScore() {
	playerScore[0].textContent = playerOne.score = 0;
	playerScore[1].textContent = tieScore = 0;
	playerScore[2].textContent = playerTwo.score = 0;
}

export {
	getNameFromInput,
	incrementScore,
	decrementScore,
	resetScore,
	playerOne,
	playerTwo,
};
