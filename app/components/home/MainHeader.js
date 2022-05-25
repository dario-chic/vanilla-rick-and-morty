// Crea un componente para el Home que contendra el carrusel de curiosidades (Se rellena en el Router)
export function MainHeader() {
	const $div = document.createElement("section");
	$div.classList.add("header__main-content", "home");

	return $div;
}
