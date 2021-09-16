var imagesLoaded = require('imagesloaded');

import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Draggable, ScrollToPlugin, ScrollTrigger, InertiaPlugin, SplitText);



// Global Variables
const menuIcon = document.querySelector('.navBtnContainer');
const mobileNav = document.querySelector('.mobileNav');
const body = document.querySelector('body');
const scrollContainer = document.querySelector('.locomotive');

// Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    tablet: {
        breakpoint: 961
    }
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



        leave({ current, next, trigger }) {

            return new Promise(resolve => {

                const timeline = gsap.timeline({
                    onComplete() {
                        resolve();
                    }
                });

                timeline
                    .to(current.container, {duration: 0.5, y: 100, opacity: 0}, 0)
                    .to(current.container, {display: 'none'})
                    scroll.scrollTo(0, 0);

            });

        },



        enter({ current, next, trigger }) {

            imagesLoaded( 'body', function() {
                scroll.update();
            });

            return new Promise(resolve => {
                
                const timeline = gsap.timeline({
                    onComplete() {
                        resolve();
                    }
                });

                timeline
                    .set(next.container, {opacity: 0})
                    .from(next.container, {duration: 0.5, opacity: 0, y: 100}, 0)

            });

        },



    }],

    views: [{}],

    debug: true
});