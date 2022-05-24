export function CharacterInfo(json) {
	const gender = (json) => {
		let icon = "";

		switch (json.gender) {
			case "Male":
				icon = `<i class="fa-solid fa-mars man"></i> `;
				break;
			case "Female":
				icon = `<i class="fa-solid fa-venus woman" data-gender="female"></i>`;
				break;
			case "Genderless":
				icon = `<i class="fa-solid fa-genderless genderless"></i>`;
				break;
			case "Unknown":
				icon = `<i class="fa-solid fa-question unknown"></i>`;
				break;
		}

		return `<td class="${json.gender.toLowerCase()}">${icon} ${json.gender.charAt(0).toUpperCase() + json.gender.slice(1).toLowerCase()}</td>`;
	};

	const status = (json) => {
		let icon = "";

		switch (json.status) {
			case "Dead":
				icon = `<i class="fa-solid fa-skull skull" ></i>`;
				break;
			case "Alive":
				icon = `<i class="fa-solid fa-heart heart"></i>`;
				break;
			case "Unknown":
				icon = `<i class="fa-solid fa-question"></i>`;
				break;
		}

		return `<td class="${json.status.toLowerCase()}">${icon} ${json.status.charAt(0).toUpperCase() + json.status.slice(1).toLowerCase()}</td>`;
	};

	const species = (json) => {
		let icon = "";

		switch (json.species) {
			case "Human":
				icon = `<i class="fa-solid fa-person"></i>`;
				break;
			case "Alien":
				icon = `<i class="fa-brands fa-reddit-alien"></i>`;
				break;
			case "Unknown":
				icon = `<i class="fa-solid fa-user-alien"></i>`;
				break;
			case "Robot":
				icon = `<i class="fa-solid fa-robot"></i>`;
				break;
			case "Humanoid":
				icon = `<i class="fa-solid fa-person-circle-question"></i>`;
				break;
			case "Poopybutthole":
				icon = `<i class="fa-solid fa-poo"></i>`;
				break;
			case "Mythological Creature":
				icon = `<i class="fa-solid fa-book-atlas"></i>`;
				break;
			case "Animal":
				icon = `<i class="fa-solid fa-dog"></i>`;
				break;
			case "Disease":
				icon = `<i class="fa-solid fa-square-virus"></i>`;
				break;
		}

		return `<td class="${json.species.toLowerCase()}">${icon} ${json.species}</td>`;
	};

	const origin = (json) => {
		return `<td class="${json.origin.name.toLowerCase()}">${json.origin.name.charAt(0).toUpperCase() + json.origin.name.slice(1).toLowerCase()}</td>`;
	};

	return `
	<button class="close"><i class="fa-solid fa-circle-arrow-left"></i></button>
	<figure class="profile characters">
	<img src="${json.image}" alt="" >
	<figcaption>${json.name.toUpperCase()}</figcaption>
	</figure>
	<table class="features">
<tr>
<th>Status</th>
${status(json)}
</tr>
<tr>
<th>Gender</th>
${gender(json)}
</tr>
<tr>
<th>Species</th>
${species(json)}
</tr>
<tr>
<th>Origin</th>
${origin(json)}
</tr>
<tr>
<th>Location</th>
<td>${json.location.name}</td>
</tr>
	</table>
	`;
}
