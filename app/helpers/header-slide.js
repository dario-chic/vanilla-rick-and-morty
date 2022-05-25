const d = document;

/*Esta función realiza el funcionamiento del carrusel de curiosidades en el MainHeader, agrega los eventos a las flechas y coloca un setInterval que
cambia la curiosidad automáticamente cada 5 segundos */

export default function slider(right, left, slides) {
	const $nextBtn = d.querySelector(right),
		$prevBtn = d.querySelector(left),
		$slides = d.querySelectorAll(slides);

	const update = () => {
		d.querySelector(".header__main-content").style.background = `linear-gradient(180deg, rgba(246, 246, 246, 0) 0%, rgba(0, 0, 0, 1) 94%, rgba(0, 0, 0, 1) 100%), url(${$slides[i].dataset.url})`;
		d.querySelector(".header__main-content").style.backgroundSize = `Cover`;
		d.querySelector(".header__main-content").style.backgroundPosition = `Center`;
	};

	let i = 0;

	let auto = setInterval(() => {
		$slides[i].classList.remove("active");
		i++;

		if (i > $slides.length - 1) {
			i = 0;
		}
		$slides[i].classList.add("active");
		update();
	}, 5000);

	d.addEventListener("click", (e) => {
		if (e.target === $prevBtn) {
			$slides[i].classList.remove("active");
			i--;

			if (i < 0) {
				i = $slides.length - 1;
			}
			$slides[i].classList.add("active");
		}

		if (e.target === $nextBtn) {
			$slides[i].classList.remove("active");
			i++;

			if (i > $slides.length - 1) {
				i = 0;
			}
			$slides[i].classList.add("active");
		}

		update();
	});
}
