/*Función para extraer parametros de una URL,
está función es muy importante, sobretodo
al momento de hacer las peticiones Ajax de la API,
ya que todos los datos son obtenidos en base a la URL actual*/

export function extractParameter(url, param) {
	var regex = new RegExp(param + "=([^&/]+)", "i");

	if (!url.includes(param)) return false;
	else return url.match(regex)[1];
}
