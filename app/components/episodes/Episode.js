// Componente para crear el html de cada episodio.
export function Episode(json, container) {
	const $a = document.createElement("a"),
		$figure = document.createElement("figure");
	$figure.classList.add(`${container}__episodes`, `episodes`);
	$figure.setAttribute("data-id", `${json.id}`);
	$figure.innerHTML = `
  <img src="${json.image.medium}" alt="${json.name}">
  <figcaption>${json.name}</figcaption>
  `;

	$a.classList.add("episodes-links");
	$a.dataset.id = `${json.id}`;
	$a.href = `${location.hash.replace(/ID=[^&]+/gi, "")}${location.hash.slice(-1) == "/" ? "" : "/"}ID=${json.id}/`;
	$a.appendChild($figure);

	return $a;
}
