// Slides content
const slidesContent = document.querySelectorAll('.testimonials-content-item .content');

const ReadMoreButtonText = {
	more: 'Read more',
	less: 'Hide',
}

document.addEventListener('DOMContentLoaded', function () {

	// slider wrapper
	const mainSlider = document.querySelector('.testimonials-swiper .swiper-wrapper');

	// Slides count
	const slidesCount = mainSlider.querySelectorAll('.swiper-slide').length;

	// Element for showing slides count
	document.getElementById('slidesCount').textContent = slidesCount < 9 ? '0' + slidesCount : slidesCount;

	// Init authors slider
	const testimonialsAuthors = new Swiper('.testimonials-authors-swiper', {
		effect: "fade",
	});

	// Init content sliders
	new Swiper('.testimonials-swiper', {
		spaceBetween: 20,
		navigation: {
			nextEl: '.testimonials-next-button',
			prevEl: '.testimonials-prev-button',
		},
		pagination: {
			el: '.testimonials-progress',
			type: 'progressbar',
		},
		thumbs: {
			swiper: testimonialsAuthors,
		},
		on: {
			slideChange: function (swiper) {
				toggleSlideContent();
				changeActiveSlideNumber(swiper.activeIndex + 1);
			},
		},
	});

	// Check slide height and add a read more button in case if height is more then 250
	checkSlidesHeight();

	
});

window.addEventListener('resize', function (event) {
	checkSlidesHeight();
}, true);

const toggleSlideContent = () => {
	for (let i = 0; i < slidesContent.length; i++) {
		slidesContent[i].classList.remove('full');
		slidesContent[i].nextElementSibling.classList.remove('isActive');
		slidesContent[i].nextElementSibling.textContent = ReadMoreButtonText.more;
	}
}

const changeActiveSlideNumber = (number) => {
	document.getElementById('currentSlide').textContent = number < 9 ? '0' + number : number;
}

const checkSlidesHeight = () => {
	for (let i = 0; i < slidesContent.length; i++) {
		const item = slidesContent[i];
		const itemHeight = item.clientHeight;
		const itemButton = item.nextElementSibling;

		if (itemHeight > 250) {
			item.classList.add('oversize');
			itemButton.classList.add('show');
		}

		itemButton.addEventListener('click', function () {
			this.classList.toggle('isActive');
			this.parentElement.querySelector('.content').classList.toggle('full');

			this.textContent = this.classList.contains('isActive') ? ReadMoreButtonText.less : ReadMoreButtonText.more;
		});
	};
}