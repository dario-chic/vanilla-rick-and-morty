export function MainCharacters() {
	const $MainCharacters = document.createElement("section");
	$MainCharacters.classList.add("main-characters", "home");
	$MainCharacters.innerHTML = `<h2 class="main-characters__title">Main Characters</h2>`;

	return $MainCharacters;
}
