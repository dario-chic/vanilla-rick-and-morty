import {App} from "./App.js";
import {WindowInfo} from "./components/WindowInfo.js";
import {Footer} from "./components/Footer.js";
import {Header} from "./components/Header.js";
import {filtersDetection} from "./helpers/filters-detection.js";
import {fixUrl} from "./helpers/fix-url.js";
import {goBack} from "./helpers/go-back.js";
import {openInfoWindow} from "./helpers/open-info-window.js";
import {changePage} from "./helpers/prev-and-next-btns.js";
import {resetPagination} from "./helpers/reset-pagination.js";
import pagination from "./helpers/pagination.js";

const d = document,
	w = window;

d.addEventListener("DOMContentLoaded", (e) => {
	// Replacing fake header with the real header
	const $header = d.getElementById("header");
	$header.parentNode.replaceChild(Header(), $header);

	d.querySelector("body").appendChild(WindowInfo());
	d.querySelector("body").appendChild(Footer());

	resetPagination();
	App();

	changePage();
	filtersDetection();
	goBack();
	openInfoWindow();
	fixUrl();
	localStorage.clear("lastHash");
});

w.addEventListener("hashchange", (e) => {
	resetPagination();
	App();

	openInfoWindow();
	filtersDetection();
	fixUrl();
});
