const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const icon = document.querySelector('i');
const slides = document.querySelectorAll('.carousel-slide');
const container = document.querySelector('.carousel-container');
let currentSlide = 0;
const slidesDesktop = container.getAttribute('slides-display-d');
const slidesTablet = container.getAttribute('slides-display-t');
const slidesMobile = container.getAttribute('slides-display-m');
let slideToShow = 0;
if(screen.width <= 500) {
    slideToShow = parseInt(slidesMobile);
}
else if(screen.width > 500 && screen.width < 990) {
    slideToShow = parseInt(slidesTablet);
}
else if(screen.width >= 990) {
    slideToShow = parseInt(slidesDesktop);
}
const slideShow = () => {
    slides.forEach((slide, index) => {
        if(index >= currentSlide && index < currentSlide + slideToShow) {
            slide.style.display = 'block';
        }
        else {
            slide.style.display = 'none';
        }
    });
};
prev.addEventListener('click', () => {
    if(currentSlide > 0) {
        currentSlide = currentSlide - 1;
        slideShow();
    }   
});

next.addEventListener('click', () => {
    if(currentSlide < slides.length - slideToShow) {
        currentSlide = currentSlide + 1;
        console.log(currentSlide)
        slideShow();
    };
});

slideShow();