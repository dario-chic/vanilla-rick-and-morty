export function CharacterWindow() {
	const $section = document.createElement("section"),
		$div = document.createElement("div");

	$section.classList.add("info__container");
	$section.appendChild($div);

	$div.classList.add("info-window");

	document.addEventListener("click", (e) => {
		if (e.target.matches(".character-links *") || e.target.matches(".episodes-links *")) {
			e.preventDefault();
			let father = e.target.parentElement,
				ID = father.dataset.id;

			localStorage.setItem("lastHash", JSON.stringify(location.hash));
			location.hash += location.hash.slice(-1) == "/" ? `ID=${ID}/` : `/ID=${ID}/`;
		}

		if (e.target.matches(".close *") || e.target.matches(".info__container")) {
			localStorage.setItem("lastHash", JSON.stringify(location.hash));
			location.hash = location.hash.replace(/ID=[^&]+/gi, "");
		}
	});

	return $section;
}
