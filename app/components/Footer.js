export function Footer() {
	const $footer = document.createElement("footer");
	$footer.classList.add("footer");

	$footer.innerHTML = `
  <div class="footer__links">
  <a href="#/" class="footer__links-home">Home</a>
  <a href="#/characters" class="footer__links-characters">Characters</a>
  <a href="#/episodes" class="footer__links-episodes">Episodes</a>
  </div>
  <span class="footer__copyright">© 2022 | Dario Chic</span>
  <div class="footer__social-media">
  <a href="https://www.linkedin.com/in/dario-chic-11a22a228/" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin-in"></i></a>
  <a href="mailto:dariochic@gmail.com" target="_blank" rel="noopener"><i class="fa-solid fa-envelope"></i></a>
  <a href="https://github.com/Dario-Chic" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a>
  </div>
  <a href="https://www.dariochic.com" class="footer__personal-website">www.dariochic.com</a>
  `;

	return $footer;
}
