const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const container = document.querySelector('.carousel-container');
const slidesDesktop = container.getAttribute('slides-display-d');
const slidesTablet = container.getAttribute('slides-display-t');
const slidesMobile = container.getAttribute('slides-display-m');
const dots = document.querySelectorAll('.dot');
const menu = document.querySelector('.menu');
const recipeList = document.querySelector('.recipe-list');
const closeBtn = document.querySelector('.close-btn');

let slideToShow = 0;
if (window.screen.width < 600) {
  slideToShow = parseInt(slidesMobile, 10);
} else if (window.screen.width >= 600 && window.screen.width < 990) {
  slideToShow = parseInt(slidesTablet, 10);
} else if (window.screen.width >= 990) {
  slideToShow = parseInt(slidesDesktop, 10);
}

const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

const clearCarousel = () => {
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide) => container.removeChild(slide));
};

const fetchCategory = (category) => {
  let currentSlide = 0;
  let recipes = [];
  fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((data) => {
    recipes = data.meals;
    recipes.map((recipe) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const image = document.createElement('img');
      image.src = recipe.strMealThumb;
      image.alt = 'image';
      image.className = 'slideImg';
      slide.appendChild(image);
      container.appendChild(slide);
      return slide;
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
      });
    });

    window.addEventListener('resize', () => {
      if (window.screen.width < 600) {
        slideToShow = parseInt(slidesMobile, 10);
      } else if (window.screen.width >= 600 && window.screen.width < 990) {
        slideToShow = parseInt(slidesTablet, 10);
      } else if (window.screen.width >= 990) {
        slideToShow = parseInt(slidesDesktop, 10);
      }
      slideShow();
    });

    slideShow();
  })
    .catch((err) => err);
};

const navLinks = document.querySelectorAll('.recipe-list a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    link.classList.add('active');
    recipeList.classList.remove('show');
    clearCarousel();
    e.preventDefault();
    const category = link.textContent;
    fetchCategory(category);
  });
});

menu.addEventListener('click', () => {
  recipeList.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  recipeList.classList.remove('show');
});

fetchCategory('Starter');
