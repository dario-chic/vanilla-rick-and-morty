export function goBack() {
	document.addEventListener("click", (e) => {
		if (e.target.matches(".go-back")) {
			localStorage.setItem("lastHash", JSON.stringify(location.hash));
			window.history.back();
		}
	});
}
