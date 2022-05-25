import {changeHash} from "./change-hash.js";

export function fixUrl(params) {
	let {hash} = location;

	if (hash === "#/") `#/` === location.hash ? false : (location.hash = `#/`);
	if (hash === "#/characters" || hash.includes(`#/characters`)) changeHash();
	if (hash === "#/episodes" || hash.includes(`#/episodes`)) changeHash();
}
