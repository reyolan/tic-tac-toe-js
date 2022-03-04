import {
	historyButton,
	moveListContainer,
	moveListElement,
	squares,
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
	// [...moveListElement.children].forEach((movement) =>
	// 	movement.classList.remove("highlight")
	// );

	const li = document.createElement("li");
	li.textContent = `${mark} @ ${legend.flat()[index]}`;
	moveListElement.appendChild(li);
}

// add tayo ng function na maghahighlight ng move, basically classList lang to
function highlightMove(index) {
	[...moveListElement.children].forEach((movement) =>
		movement.classList.remove("highlight")
	);

	moveListElement.children[index].classList.add("highlight");
}

function deleteFutureMovesInMoveList(index) {
	// moveListElement.children = [...moveListElement.children].slice(0, index);
	// console.log([...moveListElement.children].slice(0, index));
	// for (let i = 0; i <= index; i++) {
	// 	moveListElement.removeChild(moveListElement.lastChild);
	// }

	[...moveListElement.children].forEach((movement, i) => {
		if (i >= index) movement.remove(); //i >= index - 1
	});
}

function clearMoveList() {
	while (moveListElement.firstChild) {
		moveListElement.removeChild(moveListElement.firstChild);
	}
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

//create an array of movement na sunud-sunod. May function tayo na may parameters na mark and then dapat sa kada index, may specific string na nakalagay (?), incorporate natin sa squares EventListener
// tapos print natin sa DOM via a function na may createElement li
