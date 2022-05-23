export function Container(area) {
	const $div = document.createElement("div");
	$div.classList.add("container", area);

	return $div;
}
