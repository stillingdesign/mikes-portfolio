var imagesLoaded = require('imagesloaded');

import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, InertiaPlugin, SplitText);



// Global Variables
const menuIcon = document.querySelector('.navBtnContainer');
const mobileNav = document.querySelector('.mobileNav');



// Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});



// Mobile Menu Toggle
const menuToggle = function menuToggle() {
    menuIcon.addEventListener(`click`, function() {
        if(this.classList.contains(`active`)) {
            this.classList.remove(`active`);
            mobileNav.classList.remove(`active`);
        } else {
            this.classList.add(`active`);
            mobileNav.classList.add(`active`);
        }
    });
}

menuToggle();



// Footer Marquee
const footerMarqueeAnimate = function footerMarqueeAnimate() {
    const footerMarquee = document.querySelector('.footerMarqueeItem');
    const footerMarqueeTrack = document.querySelector('.footerMarqueeTrack');
    const marqueeItemWidth = footerMarquee.offsetWidth;
    console.log(marqueeItemWidth);
    const marqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
    marqueeTL.to(footerMarqueeTrack,{x:-marqueeItemWidth, duration:20});
}



// Update after Images Load
imagesLoaded( 'body', function() {
    console.log('images have loaded');
    scroll.update();
    footerMarqueeAnimate();
});


/* BARBA JS START */
barba.hooks.after(() => {
    scroll.update();
});



barba.init({

    transitions: [{
        name: 'default',

        once() {},

        leave({ current, next, trigger }) {},

        enter({ current, next, trigger }) {
            imagesLoaded( 'body', function() {
                console.log('images have loaded');
                scroll.update();
            });
        },

    }],

    views: [{}],

    debug: true
});