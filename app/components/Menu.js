export function Menu() {
	const d = document,
		$nav = d.createElement("nav");
	$nav.classList.add("nav");

	$nav.innerHTML = `
  <img src="app/assets/Rick-And-Morty-Logo.png" alt="Rick and Morty"  class="nav__logo-img">
  <i class="fa-solid fa-bars"></i>
  <div class="nav__links">
  <a href="#/" class="nav__links-home">Home</a>
  <a href="#/characters/" class="nav__links-characters">Characters</a>
  <a href="#/episodes/" class="nav__links-episodes">Episodes</a>
  </div>`;

	d.addEventListener("click", (e) => {
		if (e.target.matches(".fa-bars") || e.target.matches(".nav__links a")) {
			d.querySelector(".nav__links").classList.toggle("active");
		}
	});

	return $nav;
}
