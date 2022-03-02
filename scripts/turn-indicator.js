function turnIndicator(element) {
	element.classList.toggle("present-turn");
}

function resetIndicator(element) {
	element.classList.remove("present-turn");
}

export { turnIndicator, resetIndicator };
