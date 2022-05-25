// Componente para crear las figure de los personajes según los datos recibidos de la API (Se rellena el el Router)
export function Character(json, container) {
	const $a = document.createElement("a"),
		$figure = document.createElement("figure");
	$figure.classList.add(`${container}__character`, `character`);
	$figure.setAttribute("data-id", `${json.id}`);
	$figure.innerHTML = `
  <img src="${json.image}" alt="${json.name}">
  <figcaption>${json.name}</figcaption>
  `;

	$a.classList.add("character-links");
	$a.dataset.id = `${json.id}`;
	$a.href = `${location.hash.replace(/ID=[^&]+/gi, "")}${location.hash.slice(-1) == "/" ? "" : "/"}ID=${json.id}/`;
	$a.appendChild($figure);

	return $a;
}
