import {
	returnButton,
	inGameContainer,
	topRowElement,
	startGameContainer,
} from "./constant.js";

import { restartGame } from "./game.js";
import { resetScore } from "./player.js";

function returnToStartGame() {
	inGameContainer.forEach((container) => {
		container.classList.add("hide-transition");
		container.addEventListener("transitionend", transitionInGametoStartGame);
	});
}

function transitionInGametoStartGame(e) {
	e.target.classList.remove("-show");
	e.target.classList.remove("hide-transition");
	e.target.classList.add("-hide");
	topRowElement.classList.remove("hide-transition");
	startGameContainer.forEach((container) =>
		container.classList.remove("-hide")
	);
	resetScore();
	restartGame();
	clearMoveList();
}

const returnEvent = () =>
	returnButton.addEventListener("click", returnToStartGame);

export { returnEvent };
