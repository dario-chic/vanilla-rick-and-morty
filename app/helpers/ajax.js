/*Funcion de ayuda para peticiones Ajax, ayuda a no repetir el código y optimizar la app en el pedido de datos.*/
export async function ajax(props) {
	let {url, cbSuccess, cbError} = props;

	await fetch(url)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((json) => cbSuccess(json))
		.catch((err) => cbError(err));
}
