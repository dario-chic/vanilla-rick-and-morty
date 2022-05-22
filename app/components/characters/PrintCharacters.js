export function PrintCharacters(params) {
	$main.appendChild($Characters);

	ajax({
		url: "https://rickandmortyapi.com/api/character/?page=2",
		cbSuccess: (json) => {
			console.log(json);
			json.results.forEach((el) => {
				$Characters.appendChild(Character(el, "characters"));
			});

			const $div = Arrows(json);

			$main.appendChild($div);
		},
		cbError: (err) => {
			console.log(err);
			let statusText = err.statusText || "An error has occurred.  ";

			$Characters.innerHTML = `<div class="error-container">
      <h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
      <p>Try reloading your browser</p>
      </div> `;
		},
	});
}
