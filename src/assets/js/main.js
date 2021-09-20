//Librarys
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







// Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    tablet: {
        breakpoint: 961
    }
});







scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".locomotive", {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".locomotive").style.transform ? "transform" : "fixed"
});








// Mobile Menu Toggle
const menuIcon = document.querySelector('.navBtnContainer');
const mobileNav = document.querySelector('.mobileNav');

const menuToggle = function () {
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
const footerMarqueeAnimate = function () {
    const footerMarquee = document.querySelector('.footerMarqueeItem');
    const footerMarqueeTrack = document.querySelector('.footerMarqueeTrack');
    const footerMarqueeItemWidth = footerMarquee.offsetWidth;
    console.log(footerMarqueeItemWidth);
    const footerMarqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
    footerMarqueeTL.to(footerMarqueeTrack,{x:-footerMarqueeItemWidth, duration:20});  
}





// Marquee
const marqueeAnimate = function () {
    const marquee = document.querySelectorAll('.marqueeTrack');
    marquee.forEach(function (marquee){
        gsap.to(marquee, {
            scrollTrigger: {
                trigger: marquee,
                scroller: ".locomotive",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            x: "-33.33%",
            ease: "none"
        })
    })
}





// Work Experience Dropdown
const experienceToggle = function () {
    const resumeItems = document.querySelectorAll('.resumeItem');
    resumeItems.forEach(function (item) {
        let jobTitleHeight = item.offsetHeight;
        item.addEventListener('click', function () {
            let jobDescHeight = this.children[4].offsetHeight;
            if(this.classList.contains('active')) {
                this.classList.remove('active')
                this.style.height = jobTitleHeight + "px"
            } else {
                this.classList.add('active')
                this.style.height = jobTitleHeight + jobDescHeight + "px"
            }
            setTimeout(function () { scroll.update(); }, 1000)
        })
    });
}

experienceToggle();







// Update scroll height after Images Load
imagesLoaded( 'body', function() {
    scroll.update();
    footerMarqueeAnimate();
    marqueeAnimate();
});







/* Barba */
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