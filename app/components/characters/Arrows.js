import {ajax} from "../../helpers/ajax.js";
import pagination from "../../helpers/pagination.js";
import {Character} from "../Character.js";
import {Loader} from "../Loader.js";

export function Arrows(json) {
	const d = document;

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
