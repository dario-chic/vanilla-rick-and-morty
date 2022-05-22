import {ajax} from "../helpers/ajax.js";
import slider from "../helpers/header-slide.js";
import {Loader} from "./Loader.js";
import {CuriositiesHeader} from "./home/CuriositiesHeader.js";
import {MainHeader} from "./home/MainHeader.js";
import {Description} from "./home/Description.js";
import {MainCharacters} from "./home/MainCharacters.js";
import {Character} from "./Character.js";
import {SearchForm} from "./characters/SearchForm.js";
import {Characters} from "./characters/Characters.js";
import {Arrows} from "./characters/Arrows.js";
import {extractParameter} from "../helpers/extract-parameter.js";
import pagination from "../helpers/pagination.js";
import {changeHash} from "../helpers/change-hash.js";
import {ArrowContainer} from "./characters/ArrowContainer.js";

export async function Router() {
	const d = document,
		$main = d.getElementById("root");

	let {hash} = location;

	if (!hash || hash === "#/" || hash.includes("#/ID=")) {
		const $header = d.querySelector("header");

		d.querySelector(".nav__links-home").classList.add("active");
		// Main Header

		if (!d.querySelector(".header__main-content")) {
			const $mainHeader = MainHeader(),
				$headerLoader = Loader("header__loader");

			$header.appendChild($mainHeader);
			$mainHeader.appendChild($headerLoader);

			ajax({
				url: "app/assets/rickandmorty.json",
				cbSuccess: (json) => {
					let html = "";

					json.curiosities.forEach((el) => (html += CuriositiesHeader(el, json.curiosities)));

					html += `
        <div class="slider-btns">
        <i class="fa-solid fa-angle-left slider-btn prev"></i>
        <i class="fa-solid fa-angle-right slider-btn next"></i></div>
        `;

					$mainHeader.innerHTML = html;
				},
				cbError: () => {},
			});
			setTimeout(() => {
				slider(".slider-btns .next", ".slider-btns .prev", ".header__main");
			}, 1000);
		} else {
		}

		if (!d.querySelector(".description")) {
			const $description = Description(),
				$descriptionLoader = Loader("description__loader");
			$description.appendChild($descriptionLoader);
			$main.appendChild($description);

			ajax({
				url: "app/assets/rickandmorty.json",
				cbSuccess: (json) => {
					$description.innerHTML = `
					<div class="description__info">
					<img src="app/assets/Rick-And-Morty-Logo.png" alt="">
					<p>${json.description.info}</p>
					</div>
					<div class="description__img"><img src="app/assets/rickandmoryprofile.jpg" alt=""></div>
					`;
				},
				cbError: () => {},
			});
		} else {
		}

		if (!d.querySelector(".main-characters")) {
			const $MainCharacters = MainCharacters(),
				$Characters = d.createElement("div"),
				$mainCharactersLoader = Loader("main-characters__loader");

			$Characters.classList.add("main-characters__characters");
			$MainCharacters.appendChild($Characters);
			$MainCharacters.appendChild($mainCharactersLoader);

			$main.appendChild($MainCharacters);

			ajax({
				url: "https://rickandmortyapi.com/api/character/1,2,3,4,5",
				cbSuccess: (json) => {
					json.forEach((el) => {
						$Characters.appendChild(Character(el, "main-characters"));
					});
					$MainCharacters.removeChild($mainCharactersLoader);

					const $moreButton = d.createElement("a");
					$moreButton.classList.add("main-characters__more");
					$moreButton.href = "#/characters";
					$moreButton.innerHTML = `See More...`;
					$MainCharacters.appendChild($moreButton);
				},
				cbError: () => {},
			});
		} else {
		}

		let home = d.querySelectorAll(".home");
		home.forEach((el) => (el.style.display = ""));
	} else {
		let home = d.querySelectorAll(".home");
		home.forEach((el) => (el.style.display = "none"));
		d.querySelector(".nav__links-home").classList.remove("active");
	}

	if (hash === "#/characters" || hash.includes("#/characters")) {
		d.querySelector(".nav__links-characters").classList.add("active");

		if (!d.querySelector(".characters")) {
			const $Characters = Characters(),
				$SearchForm = SearchForm(),
				$arrowsContainer = d.createElement("div"),
				$CharactersLoader = Loader("main-characters__loader", "off");
			$arrowsContainer.classList.add("next-and-prev-buttons", "characters");

			$main.appendChild($SearchForm);
			$main.appendChild(ArrowContainer());
			$main.appendChild($CharactersLoader);
			$main.appendChild($Characters);
			$main.appendChild(ArrowContainer());
		}
		const $Characters = d.querySelector(".characters-container"),
			$CharactersLoader = d.querySelector(".main-characters__loader");

		let lastUrl = JSON.parse(localStorage.getItem("lastHash")) || "";

		if ((!hash.includes("ID=") && !lastUrl.includes("ID=")) || lastUrl == null || $Characters.innerHTML === "") {
			$CharactersLoader.classList.remove("off");
			$Characters.innerHTML = null;

			d.querySelectorAll(".next-and-prev-buttons").forEach((el) => el.classList.add("off"));

			let characterPage = extractParameter(hash, "page") || 1,
				name = extractParameter(hash, "name") || "",
				gender = extractParameter(hash, "gender") || "",
				status = extractParameter(hash, "status") || "",
				filters = `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`;

			ajax({
				url: `https://rickandmortyapi.com/api/character/${filters}`,
				cbSuccess: (json) => {
					console.log("a");
					$Characters.innerHTML = null;
					json.results.forEach((el) => {
						$Characters.appendChild(Character(el, "characters"));
					});

					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = Arrows(json)));
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => el.classList.remove("off"));

					$CharactersLoader.classList.add("off");
				},
				cbError: (err) => {
					console.log(err);
					$main.style.minHeight = "calc(100vh - 193.55px)";
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$Characters.innerHTML = `
		<div class="error-container">
				<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
				<p>There are no results for this request or something else is going wrong</p>
				<button class="go-back">Go back</button>
				</div> 
				`;
					$CharactersLoader.classList.add("off");
				},
			});
		}

		let characters = d.querySelectorAll(".characters");
		characters.forEach((el) => (el.style.display = ""));
	} else {
		let characters = d.querySelectorAll(".characters");
		characters.forEach((el) => (el.style.display = "none"));
		d.querySelector(".nav__links-characters").classList.remove("active");

		pagination.character.gender = null;
		pagination.character.status = null;
		pagination.character.page = 1;
		changeHash();
	}
}
