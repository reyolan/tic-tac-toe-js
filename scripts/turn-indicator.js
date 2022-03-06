function turnIndicator(...elements) {
	elements.forEach((element) => element.classList.toggle("present-turn"));
}

function resetIndicator(...elements) {
	elements.forEach((element) => element.classList.remove("present-turn"));
}

export { turnIndicator, resetIndicator };
