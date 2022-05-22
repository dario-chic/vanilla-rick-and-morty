export function extractParameter(url, param) {
	var regex = new RegExp(param + "=([^&/]+)", "i");

	if (!url.includes(param)) return false;
	else return url.match(regex)[1];
}
