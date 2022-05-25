import {extractParameter} from "./extract-parameter.js";
import pagination from "./pagination.js";

/*Funcion que ayuda a actualizar  los valores de el objeto de paginación a la URL actual, para así no tener errores en las peticiones o 
funcionalidades de la página */

export function resetPagination() {
	let hash = location.hash;
	pagination.PAGE = extractParameter(hash, "page") || 1;
	pagination.NAME = extractParameter(hash, "name") || "";
	pagination.character.gender = extractParameter(hash, "gender") || "";
	pagination.character.status = extractParameter(hash, "status") || "";
	pagination.ID = extractParameter(hash, "ID");
	pagination.FILTER = `?page=${pagination.PAGE}${pagination.NAME ? `&name=${pagination.NAME}` : ""}${pagination.character.gender ? `&gender=${pagination.character.gender}` : ""}${pagination.character.status ? `&status=${pagination.character.status}` : ""}${
		pagination.ID ? `/ID=${pagination.ID}` : ""
	}`;
}
