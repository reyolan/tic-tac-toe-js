import {
	returnButton,
	inGameContainer,
	topRowElement,
	startGameContainer,
} from "./constant.js";

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
}

const returnEvent = () =>
	returnButton.addEventListener("click", returnToStartGame);

export { returnEvent };
