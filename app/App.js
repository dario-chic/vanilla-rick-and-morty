import {Header} from "./components/Header.js";
import {Router} from "./components/Router.js";

export async function App() {
	const d = document,
		$header = d.getElementById("header"),
		$root = d.getElementById("root");

	// $root.innerHTML = null;
	Router();

	// console.log(a);
}
