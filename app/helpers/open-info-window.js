import {CharacterInfo} from "../components/CharacterInfo.js";
import {EpisodeInfo} from "../components/EpisodeInfo.js";
import {Loader} from "../components/Loader.js";
import {ajax} from "./ajax.js";
import {extractParameter} from "./extract-parameter.js";

export function openInfoWindow() {
	if (location.hash.includes("/ID=")) {
		document.querySelector(".info__container").classList.add("active");

		const $div = document.querySelector(".info-window");
		$div.innerHTML = null;
		$div.appendChild(Loader("info__loader"));

		if (location.hash.includes("#/characters")) {
			ajax({
				url: `https://rickandmortyapi.com/api/character/${extractParameter(location.hash, "ID")}`,
				cbSuccess: (json) => {
					$div.innerHTML = CharacterInfo(json);
				},
				cbError: (err) => {
					document.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$div.innerHTML = `
			<button class="close"><i class="fa-solid fa-circle-arrow-left"></i></button>
			<div class="error-container">
					<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
					<p>There are no results for this request or something else is going wrong</p>
					</div> 
					`;
				},
			});
		} else if (location.hash.includes("#/episodes")) {
			ajax({
				url: `https://api.tvmaze.com/episodes/${extractParameter(location.hash, "ID")}`,
				cbSuccess: (json) => {
					console.log(json);
					$div.innerHTML = EpisodeInfo(json);
				},
				cbError: (err) => {
					document.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$div.innerHTML = `
			<button class="close"><i class="fa-solid fa-circle-arrow-left"></i></button>
			<div class="error-container">
					<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
					<p>There are no results for this request or something else is going wrong</p>
					</div> 
					`;
				},
			});
		}
	} else {
		document.querySelector(".info__container").classList.remove("active");
	}
}
