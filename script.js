const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const container = document.querySelector('.carousel-container');
const slidesDesktop = container.getAttribute('slides-display-d');
const slidesTablet = container.getAttribute('slides-display-t');
const slidesMobile = container.getAttribute('slides-display-m');
const dots = document.querySelectorAll('.dot');

let slideToShow = 0;
if (screen.width < 600) {
    slideToShow = parseInt(slidesMobile);
} else if (screen.width >= 600 && screen.width < 990) {
    slideToShow = parseInt(slidesTablet);
} else if (screen.width >= 990) {
    slideToShow = parseInt(slidesDesktop);
}

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        if(!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        throw error;
    }
};

const clearCarousel = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => container.removeChild(slide));  
}

const fetchCategory = (category) => {
    let currentSlide = 0;
    let recipes = [];
    fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(data => {
        recipes = data.meals;
        recipes.map((recipe) => {
            const slide = document.createElement('div');
            slide.className = "carousel-slide";
            const image = document.createElement('img');
            image.src = recipe.strMealThumb;
            image.alt = "image";
            image.className = "slideImg";
            slide.appendChild(image);
            container.appendChild(slide);
        });

        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
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

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                slideShow();
            })
        })

        window.addEventListener('resize', () => {
            if (screen.width < 600) {
                slideToShow = parseInt(slidesMobile);
            } else if (screen.width >= 600 && screen.width < 990) {
                slideToShow = parseInt(slidesTablet);
            } else if (screen.width >= 990) {
                slideToShow = parseInt(slidesDesktop);
            }
            slideShow();
        });


        slideShow();

        
        })
        .catch(err => err);
}

const navLinks = document.querySelectorAll('.recipe-list a');
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        clearCarousel();
        e.preventDefault();
        const category = link.textContent;
        fetchCategory(category);
    })
})

fetchCategory("Starter");
