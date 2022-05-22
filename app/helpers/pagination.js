import {extractParameter} from "./extract-parameter.js";

const {hash} = location;

let characterPage = extractParameter(hash, "page") || 1,
	name = extractParameter(hash, "name") || "",
	gender = extractParameter(hash, "gender") || "",
	status = extractParameter(hash, "status") || "",
	filters = `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`;

let episodesPage = extractParameter(hash, "page") || 1,
	season = extractParameter("season"),
	episode = extractParameter("episode");

export default {
	character: {page: characterPage, gender, name, status, filters: `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`},
	episodes: {page: episodesPage, season, episode, filters: ""},
};
