export function ArrowContainer(area) {
	const $arrowsContainer = document.createElement("div");
	$arrowsContainer.classList.add("next-and-prev-buttons", area);

	return $arrowsContainer;
}
