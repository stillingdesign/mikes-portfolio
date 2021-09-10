import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, InertiaPlugin, SplitText);

const menuIcon = document.querySelector('.navBtnContainer');
const mobileNav = document.querySelector('.mobileNav');

let scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

barba.hooks.leave(() => {
});

barba.hooks.beforeLeave(() => {
    menuIcon.classList.remove(`active`);
    mobileNav.classList.remove(`active`);
});

barba.hooks.enter(() => {
    window.scrollTo(0, 0);
    globalScripts();
});

barba.hooks.after(() => {
    scroll.update();
    globalScripts();
});

barba.init({
    transitions: [{

        once(data) {
            window.addEventListener('load', (event) => {
                globalScripts();
            })
        }

    }]
});



// Global Scripts
const globalScripts = function globalScripts() {

    // Menu Toggle
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
    console.log(marqueeItemWidth);
    const marqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
    marqueeTL.to(footerMarqueeTrack,{x:-marqueeItemWidth, duration:20});

}






/* Global Scripts
const globalScripts = function globalScripts() {



    // Init Locomotive
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    scroll.destroy()

    setTimeout(function(){
        scroll.init()
    }, 100);



    // Menu Toggle
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
    console.log(marqueeItemWidth);
    const marqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
    marqueeTL.to(footerMarqueeTrack,{x:-marqueeItemWidth, duration:20});

}
*/