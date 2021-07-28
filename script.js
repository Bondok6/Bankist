'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

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
    console.log(id);
    let coords = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: coords.left + pageXOffset,
      top: coords.top + pageYOffset,
      behavior: 'smooth'
    });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

