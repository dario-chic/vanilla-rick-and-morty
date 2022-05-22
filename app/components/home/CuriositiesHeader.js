export function CuriositiesHeader(el, curiosities) {
	return `
  <article class="header__main ${el === curiosities[0] ? "active" : ""}" data-url="${el.img}">
    <div class="header__main-info">
      <h2 class="header__main-title">${el.title}</h2>
      <p class="header__main-text">${el.content}</p>
      <button>Watch Now</button>
    </div>
</article>
  `;
}
