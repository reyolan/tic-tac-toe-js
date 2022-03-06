import {
	historyButton,
	moveListContainer,
	moveListElement,
} from "./constant.js";

const legend = [
	["upper-left", "top", "upper-right"],
	["middle-left", "middle", "middle-right"],
	["bottom-left", "bottom", "bottom-right"],
];

function showMoveList() {
	moveListContainer.classList.toggle("-hide");
}

function addToMoveList(index, mark) {
	const li = document.createElement("li");
	li.textContent = `${mark} @ ${legend.flat()[index]}`;
	moveListElement.appendChild(li);
}

function highlightMove(index) {
	[...moveListElement.children].forEach((movement) =>
		movement.classList.remove("highlight")
	);

	moveListElement.children[index].classList.add("highlight");
}

function deleteFutureMovesInMoveList(index) {
	[...moveListElement.children].forEach((movement, i) => {
		if (i >= index) movement.remove();
	});
}

function clearMoveList() {
	moveListElement.innerHTML = "";
}

const showMoveListEvent = () =>
	historyButton.addEventListener("click", showMoveList);

export {
	showMoveListEvent,
	addToMoveList,
	deleteFutureMovesInMoveList,
	highlightMove,
	clearMoveList,
};
