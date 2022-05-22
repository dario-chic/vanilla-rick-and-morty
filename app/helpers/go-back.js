export function goBack() {
	document.addEventListener("click", (e) => {
		if (e.target.matches(".go-back")) {
			window.history.back();
		}
	});
}
