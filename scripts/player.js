import {
	inputNameDiv,
	inputNames,
	playerOneName,
	playerTwoName,
	playerScore,
} from "./constant.js";

// import { gameHistory } from "./history.js";

//if we want to choose who will go first, create a function that will change playerOne.mark and playerTwo.mark

//when div is clicked, scale that div then don natin i-associate kung anong mark. Gawa tayo eventlistener for both div para machange yung mark

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

function chooseFirstTurnTransition() {
	inputNameDiv.forEach((div) => div.classList.toggle("choose"));
}

function firstTurn() {
	//parang if index === 0 yung may class na 'choose' playerOne.mark = 'X'

	for (const element of inputNameDiv) {
		if (element.classList.contains('choose')) {playerOne.mark = }
	}
}

function getNameFromInput() {
	//kung sino yung may choose na class, ayun yung magiging player one
	playerOne.name = playerOneName.textContent = inputNames[0].value;
	playerTwo.name = playerTwoName.textContent = inputNames[1].value;
}

// function adjustScore(operator, player = "tie") {
// 	if (player === "tie") {
// 		operator === "increment" ? (tieScore += 1) : (tieScore -= 1);
// 		playerScore[1].textContent = tieScore;
// 		return;
// 	}
// 	//gawa tayo parameter na increment decrement
// 	operator === "increment" ? (player.score += 1) : (player.score -= 1);

// 	if (player === playerOne) {
// 		playerScore[0].textContent = player.score;
// 	} else {
// 		playerScore[2].textContent = player.score;
// 	}
// }

function resetScore() {
	// playerScore.forEach((score) => (score.textContent = 0));
	// [playerOne.score, tieScore, playerTwo.score].forEach((score) => (score = 0));
	playerScore[0].textContent = playerOne.score = 0;
	playerScore[1].textContent = tieScore = 0;
	playerScore[2].textContent = playerTwo.score = 0;
}

// function getScoreFromState() {
// 	playerOne.score = gameHistory[gameHistory - 1].playerOneScore;
// 	playerTwo.score = gameHistory[gameHistory - 1].playerTwoScore;
// 	tieScore = gameHistory[gameHistory - 1].tieScore;
// }

function changeScoreFromState(
	playerOneScoreState,
	playerTwoScoreState,
	tieScoreState
) {
	playerScore[0].textContent = playerOne.score = playerOneScoreState;
	playerScore[1].textContent = tieScore = tieScoreState;
	playerScore[2].textContent = playerTwo.score = playerTwoScoreState;
}

const chooseFirstEvent = () => {
	inputNameDiv.forEach((div) =>
		div.addEventListener("click", chooseFirstTurnTransition)
	);
};

export {
	playerOne,
	playerTwo,
	tieScore,
	getNameFromInput,
	resetScore,
	changeScoreFromState,
	chooseFirstEvent,
};
