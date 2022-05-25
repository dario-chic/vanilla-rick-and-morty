// Crea un componente para el Home que otorga una breve descripción de la serie (Se rellena el el Router)
export function Description() {
	const $description = document.createElement("section");
	$description.classList.add("description", "home");

	return $description;
}
