'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const imgTargets = document.querySelectorAll('img[data-src]');


// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scroll
btnScrollTo.addEventListener('click', () => {
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + pageXOffset,
    top: s1coords.top + pageYOffset,
    behavior: 'smooth'
  });

  // section1.scrollIntoView({ behavior: 'smooth' });

});

// Page Navigation || Delegation way

// document.querySelectorAll('.nav__link').forEach((link) => {
//   link.addEventListener('click', function (e) {
    // e.preventDefault();
    // const id = this.getAttribute('href');
    // // console.log(id);
    // let coords = document.querySelector(id).getBoundingClientRect();

    // window.scrollTo({
    //   left: coords.left + pageXOffset,
    //   top: coords.top + pageYOffset,
    //   behavior: 'smooth'
    // });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    let coords = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: coords.left + pageXOffset,
      top: coords.top + pageYOffset,
      behavior: 'smooth'
    });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Active tabs
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  
})

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hoverLink = e.target;
    const otherLinks = e.target.closest('nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('nav').querySelector('img');

    otherLinks.forEach((l) => {
      if (l !== hoverLink) l.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation || Bad performance to us scroll event
// const initCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (scrollY > initCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

// Sticky navigation || Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};

const headerObserver = new IntersectionObserver(stickyNav,headerOptions);
headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target)
}

const sectionOptions = {
  root: null,
  threshold: 0.15
}

const sectionObserver = new IntersectionObserver(revealSection, sectionOptions);
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images 
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
  
}

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px'
};

const imgObserver = new IntersectionObserver(loadImg, imgOptions);
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.slider__btn--right');
  const prevBtn = document.querySelector('.slider__btn--left');

  const maxSlide = slides.length - 1;
  let currSlide = 0;

  const dots = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const activeDots = function (slide) {
    document.querySelectorAll('.dots__dot')
      .forEach(el => el.classList.remove('dots__dot--active'));
    
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  }

  const nextSlide = function () {
    if (currSlide === maxSlide) currSlide = 0;
    else currSlide++;
    
    goToSlide(currSlide);
    activeDots(currSlide);
  }

  const prevSlide = function () {
    if (currSlide === 0)  currSlide = maxSlide;
    else currSlide--;

    goToSlide(currSlide);
    activeDots(currSlide);
  }

  const init = function () {
    createDots();
    goToSlide(0);
    activeDots(0);
  }

  init();

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });


  dots.addEventListener('click', function(e){
    if (e.target.classList.contains('dots__dot')) {
      const slideNum  = e.target.dataset.slide;
      goToSlide(slideNum);
      activeDots(slideNum);
    }
  })
  
}
slider();