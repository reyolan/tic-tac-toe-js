import {
	topRowElement,
	startGameButton,
	startGameContainer,
	inGameContainer,
} from "./constant.js";

import { firstTurn, getNameFromInput } from "./player.js";

function startGameAnimation() {
	topRowElement.classList.add("hide-transition");
	startGameContainer.forEach((container) =>
		container.classList.add("hide-transition")
	);

	topRowElement.addEventListener(
		"transitionend",
		() => {
			startGameContainer.forEach((container) => {
				container.classList.add("-hide");
				container.classList.remove("hide-transition");
			});

			inGameAnimation();
		},
		{ once: true }
	);
}

function inGameAnimation() {
	inGameContainer.forEach((container) => {
		container.classList.remove("-hide");
		container.classList.add("-show");
	});
}

function startGame() {
	startGameAnimation();
	getNameFromInput();
	firstTurn();
}

const startGameEvent = () => {
	startGameButton.addEventListener("click", startGame);
};

export { startGameEvent };
