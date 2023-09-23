const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const slides = document.querySelectorAll('.carousel-slide');
const container = document.querySelector('.carousel-container');
let currentSlide = 0;
const slidesDesktop = container.getAttribute('slides-display-d');
const slidesTablet = container.getAttribute('slides-display-t');
const slidesMobile = container.getAttribute('slides-display-m');
const dots = document.querySelectorAll('.dot');
let slideToShow = 0;
if (screen.width <= 768) {
    slideToShow = parseInt(slidesMobile);
} else if (screen.width > 768 && screen.width < 990) {
    slideToShow = parseInt(slidesTablet);
} else if (screen.width >= 990) {
    slideToShow = parseInt(slidesDesktop);
}
const totalSlides = slides.length; // Total number of slides

const slideShow = () => {
    slides.forEach((slide, index) => {
        const distance = (index - currentSlide + totalSlides) % totalSlides;
        if (distance < slideToShow) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
};

prev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slideShow();
});

next.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slideShow();
});

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slideShow();
    })
})

window.addEventListener('resize', () => {
    if (screen.width <= 768) {
        slideToShow = parseInt(slidesMobile);
    } else if (screen.width > 768 && screen.width < 990) {
        slideToShow = parseInt(slidesTablet);
    } else if (screen.width >= 990) {
        slideToShow = parseInt(slidesDesktop);
    }
    slideShow();
});


slideShow();
