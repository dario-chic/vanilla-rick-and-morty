export function CharacterWindow() {
	const $section = document.createElement("section"),
		$div = document.createElement("div");

	$section.classList.add("info__container");
	$section.appendChild($div);

	$div.classList.add("info-window");

	document.addEventListener("click", (e) => {
		if (e.target.matches(".character *")) {
			let character = e.target.parentElement,
				ID = character.dataset.id;
			location.hash += location.hash.slice(-1) == "/" ? `ID=${ID}` : `/ID=${ID}`;
		}

		if (e.target.matches(".close *") || e.target.matches(".info__container")) {
			location.hash = location.hash.replace(/ID=[^&]+/gi, "");
		}
	});

	return $section;
}
