/* Crea un componente para crear las flechas que permiten el desplazamiento entre pág/nas de la API, 
se pitan según haya o no páginas para avanzar o retroceder.*/
export function Arrows(json) {
	let html = ``;

	html += json.info.prev
		? `
  <button class='prev' >
  <i class="fa-solid fa-circle-arrow-left" data-url="${json.info.prev}"></i>
  </button>`
		: "";

	html += json.info.next
		? `
  <button class='next' >
  <i class="fa-solid fa-circle-arrow-right" data-url="${json.info.next}"></i>
  </button>`
		: "";

	return html;
}
