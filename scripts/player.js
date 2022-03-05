import {
	inputNameDiv,
	inputNames,
	playerOneName,
	playerOneMark,
	playerTwoName,
	playerTwoMark,
	playerScore,
} from "./constant.js";

// import { gameHistory } from "./history.js";

//if we want to choose who will go first, create a function that will change playerOne.mark and playerTwo.mark

//when div is clicked, scale that div then don natin i-associate kung anong mark. Gawa tayo eventlistener for both div para machange yung mark

const playerOne = {
	name: "",
	mark: "",
	score: 0,
};

const playerTwo = {
	name: "",
	mark: "",
	score: 0,
};

let tieScore = 0;

function firstTurn() {
	playerOne.mark = playerOneMark.textContent =
		inputNameDiv[0].classList.contains("choose") ? "X" : "O";
	playerTwo.mark = playerTwoMark.textContent =
		inputNameDiv[0].classList.contains("choose") ? "O" : "X";
}

function getNameFromInput() {
	const i = inputNameDiv[0].classList.contains("choose") ? 0 : 1;
	const j = inputNameDiv[0].classList.contains("choose") ? 1 : 0;

	playerOne.name = playerOneName.textContent = inputNames[i].value;
	playerTwo.name = playerTwoName.textContent = inputNames[j].value;
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
	inputNameDiv[0].addEventListener("click", (e) => {
		if (e.target === e.currentTarget) {
			e.target.classList.add("choose");
			e.target.nextElementSibling.classList.remove("choose");
		}
	});

	inputNameDiv[1].addEventListener("click", (e) => {
		if (e.target === e.currentTarget) {
			e.target.classList.add("choose");
			e.target.previousElementSibling.classList.remove("choose");
		}
	});
};

export {
	playerOne,
	playerTwo,
	tieScore,
	getNameFromInput,
	resetScore,
	changeScoreFromState,
	chooseFirstEvent,
	firstTurn,
};
