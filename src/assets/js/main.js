import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, InertiaPlugin, SplitText);


// Init Locomotive
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

// Menu Open
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

// Footer Marquee
const footerMarquee = document.querySelector('.footerMarqueeItem');
const footerMarqueeTrack = document.querySelector('.footerMarqueeTrack');
const marqueeItemWidth = footerMarquee.offsetWidth;
const marqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
marqueeTL.to(footerMarqueeTrack,{x:-marqueeItemWidth, duration:20});