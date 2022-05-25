// Crea un componente para colocar las flechas que permiten el avance y retroceso de las paginas de la API  (sirve para todas las secciones) (Se rellena el el Router)
export function ArrowContainer(area) {
	const $arrowsContainer = document.createElement("div");
	$arrowsContainer.classList.add("next-and-prev-buttons", area);

	return $arrowsContainer;
}
