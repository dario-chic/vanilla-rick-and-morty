/*Pequeña función que agrega un listener a los botones "go back" para volver una URL atras en caso de error. */
export function goBack() {
	document.addEventListener("click", (e) => {
		if (e.target.matches(".go-back")) {
			localStorage.setItem("lastHash", JSON.stringify(location.hash));
			window.history.back();
		}
	});
}
