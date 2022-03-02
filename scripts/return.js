import {
	returnButton,
	inGameContainer,
	topRowElement,
	startGameContainer,
	playerScore,
} from "./constant.js";

import { xScore, oScore } from "./game.js";

function returnToStartGame() {
	inGameContainer.forEach((container) => {
		container.classList.add("hide-transition");
		container.addEventListener("transitionend", transitionInGametoStartGame);
	});
	resetScore();
}

function resetScore() {
	// xScore = 0;
	console.log(xScore);
	playerScore[0].textContent = xScore;
	// oScore = 0;
	playerScore[1].textContent = oScore;
}

function transitionInGametoStartGame(e) {
	e.target.classList.remove("-show");
	e.target.classList.remove("hide-transition");
	e.target.classList.add("-hide");
	topRowElement.classList.remove("hide-transition");
	startGameContainer.forEach((container) =>
		container.classList.remove("-hide")
	);
}

const returnEvent = () =>
	returnButton.addEventListener("click", returnToStartGame);

export { returnEvent };
