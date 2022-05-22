import {App} from "./App.js";
import {CharacterWindow} from "./components/CharacterWindow.js";
import {Footer} from "./components/Footer.js";
import {Header} from "./components/Header.js";
import {filtersDetection} from "./helpers/filters-detection.js";
import {goBack} from "./helpers/go-back.js";
import {openInfoWindow} from "./helpers/open-info-window.js";
import {changePage} from "./helpers/prev-and-next-btns.js";

const d = document,
	w = window;

d.addEventListener("DOMContentLoaded", (e) => {
	// Replacing fake header with the real header
	const $header = d.getElementById("header");
	$header.parentNode.replaceChild(Header(), $header);

	d.querySelector("body").appendChild(CharacterWindow());
	d.querySelector("body").appendChild(Footer());

	App();

	changePage(); //Function for arrows working
	filtersDetection(); //Functions for activating filters in case
	goBack(); // Go back one tab when certain buttons are pressed
	openInfoWindow();
});

w.addEventListener("hashchange", (e) => {
	App();
	filtersDetection();
	openInfoWindow();
});
