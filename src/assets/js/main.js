import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

// Menu
const menuIcon = document.querySelector('.navBtnContainer');
const mobileNav = document.querySelector('.mobileNav');
menuIcon.addEventListener(`click`, function() {
  if(this.classList.contains(`active`)) {
       this.classList.remove(`active`);
       mobileNav.classList.remove(`active`);
  } else {
       this.classList.add(`active`);
       mobileNav.classList.add(`active`);
    }
});