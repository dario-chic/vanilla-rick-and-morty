import {changeHash} from "./change-hash.js";
import pagination from "./pagination.js";

/*Función para activar el funcionamiento de las flechas al momento de avanzar y retroceder en las paginas de busqueda de la API,
tiene un funcionamiento simple, aumento o disminuye el atributo PAGE de la paginación y actualiza el HASH */
export function changePage() {
	document.addEventListener("click", (e) => {
		if (e.target.matches(".next-and-prev-buttons *")) {
			if (e.target.matches(".next-and-prev-buttons .next i")) {
				pagination.PAGE++;
			}

			if (e.target.matches(".next-and-prev-buttons .prev i")) {
				pagination.PAGE--;
			}
			changeHash();

			window.scrollTo({
				behavior: "smooth",
				top: 10,
				left: 0,
			});
		}
	});
}
