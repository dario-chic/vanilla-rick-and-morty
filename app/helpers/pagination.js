import {extractParameter} from "./extract-parameter.js";

const {hash} = location;

/* Estos datos son de los mas esenciales, ya que contienen toda la información de filtros, de la pagina, de los ID y el Filtro que se usara para hacer 
las peticiones de Ajax, ayuda a obtener todos estos datos de las url y usarse donde sea, para asi no ser repetitivo al momento de solicitar estos datos */

const page = extractParameter(hash, "page") || 1,
	name = extractParameter(hash, "name") || "",
	gender = extractParameter(hash, "gender") || "",
	status = extractParameter(hash, "status") || "",
	ID = extractParameter(hash, "ID");

export default {
	character: {gender, status},
	ID,
	PAGE: page,
	NAME: name,
	FILTER: `?page=${page}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}${ID ? `/ID=${ID}` : ""}`,
};
