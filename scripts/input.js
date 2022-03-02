import { inputNames, playerOneName, playerTwoName } from "./constant.js";

function getNameFromInput() {
	playerOneName.textContent = inputNames[0].value;
	playerTwoName.textContent = inputNames[1].value;
}

export { getNameFromInput };
