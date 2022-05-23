import {extractParameter} from "./extract-parameter.js";

const {hash} = location;

let characterPage = extractParameter(hash, "page") || 1,
	name = extractParameter(hash, "name") || "",
	gender = extractParameter(hash, "gender") || "",
	status = extractParameter(hash, "status") || "",
	filters = `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`;

let episodesPage = extractParameter(hash, "page") || 1,
	season = extractParameter(hash, "season") || "",
	episode = extractParameter(hash, "cap") || "",
	nombre = extractParameter(hash, "name") || "";

export default {
	character: {page: characterPage, gender, name, status, filters: `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`},
	episodes: {page: episodesPage, name: nombre, filters: `?page=${episodesPage}${name ? `&name=${name}` : ""}`},
};
