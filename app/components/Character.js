export function Character(json, container) {
	const $figure = document.createElement("figure");
	$figure.classList.add(`${container}__character`, `character`);
	$figure.setAttribute("data-id", `${json.id}`);
	$figure.innerHTML = `
  <img src="${json.image}" alt="${json.name}">
  <figcaption>${json.name}</figcaption>
  `;

	return $figure;
}
