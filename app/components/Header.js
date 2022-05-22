import {Menu} from "./Menu.js";

export function Header() {
	const d = document,
		$header = d.createElement("header");
	$header.classList.add("header");

	$header.appendChild(Menu());

	return $header;
}
