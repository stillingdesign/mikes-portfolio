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




// Use Locomotive Scroll with ScrollTrigger
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




// Custom cursor
const cursorAnimate = function () {
    const cursors = document.querySelector('.cursors')
    const cursor = cursors.querySelector('.cursor')
    const cursorLinks = document.querySelectorAll('a, video, .resumeItem')
    let cursorX = 0
    let cursorY = 0
    let aimX = 0
    let aimY = 0
    let speed = 0.2

    const cursorEase = function () {
        cursorX += (aimX - cursorX) * speed
        cursorY += (aimY - cursorY) * speed

        cursor.style.left = cursorX + "px"
        cursor.style.top = cursorY + "px"

        requestAnimationFrame(cursorEase)
    }

    cursorEase()

    document.addEventListener('mousemove', function (event) {
        aimX = event.pageX
        aimY = event.pageY
    })

    cursorLinks.forEach(cursorLink => {
        cursorLink.addEventListener('mouseover', function () {
            cursor.classList.add(`hover`)
        })
        cursorLink.addEventListener('mouseout', function () {
            cursor.classList.remove(`hover`)
        })
    })
}




// Scroll Trigger Hero Image
const heroImgInnerAnimate = function () {
    const heroImgInner = document.querySelectorAll('.heroImgInner');
    heroImgInner.forEach(function (heroImgInner){
        gsap.to(heroImgInner, {
            scrollTrigger: {
                trigger: heroImgInner,
                scroller: ".locomotive",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            y: "-43.75%",
            ease: "none"
        })
    })
}




// Footer Marquee
const footerMarqueeAnimate = function () {
    const footerMarquee = document.querySelector('.footerMarqueeItem');
    const footerMarqueeTrack = document.querySelector('.footerMarqueeTrack');
    const footerMarqueeItemWidth = footerMarquee.offsetWidth;
    //console.log(footerMarqueeItemWidth);
    const footerMarqueeTL = gsap.timeline({repeat:-1, defaults:{ease:"none"}});
    footerMarqueeTL.to(footerMarqueeTrack,{x:-footerMarqueeItemWidth, duration:20});  
}




// Scroll Trigger Marquee
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




// Scroll Trigger Spin
const spinTextAnimate = function () {
    const spinText = document.querySelectorAll('.spinText');
    spinText.forEach(function (spinText){
        gsap.to(spinText, {
            scrollTrigger: {
                trigger: spinText,
                scroller: ".locomotive",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            rotation:360,
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
    cursorAnimate();
    footerMarqueeAnimate();
    marqueeAnimate();
    spinTextAnimate();
    ScrollTrigger.matchMedia({
        "(min-width: 960px)": function() {
            heroImgInnerAnimate();
        }
    })
});








/* Barba */

const transitionPanel1 = document.querySelector('#transitionPanel1');
const loadPanel = document.querySelector('.loadPanel');

barba.hooks.after(() => {
    marqueeAnimate();
    spinTextAnimate();
    experienceToggle();
    cursorAnimate();
    ScrollTrigger.matchMedia({
        "(min-width: 960px)": function() {
            heroImgInnerAnimate();
        }
    })
    scroll.update();
});


barba.init({

    transitions: [{
        name: 'default',



        once({ next }) {

            return new Promise(resolve => {

                const timeline = gsap.timeline({
                    onComplete() {
                        deleteSplit();
                        scroll.update();
                        resolve();
                    }
                });

                const splitHeadline = new SplitText('h1', {type:'words'})
                function deleteSplit() {
                    splitHeadline.revert()
                }


                timeline
                    .set('.load-content', {opacity: 0})
                    .set('main', {y: 200, opacity: 0})
                    .set('header', {y: -100, opacity: 0})
                    .set(splitHeadline.words, {opacity: 0, y: 48})
                    .to('.load-content', {duration: 1, opacity: 1}, 0.5)
                    .to('.loadPanel', {duration: 1, height: 0, ease: "power4.inOut"}, '+=1')
                    .to('.load-content', {duration: 1, opacity: 0}, '-=1')
                    .to('header', {duration: 1, y: 0, opacity: 1, ease: "power4.out"}, '-=0.5')
                    .to('main', {duration: 1, y: 0, opacity: 1, ease: "power4.out"}, '-=1')
                    .to(splitHeadline.words, {duration: 1, y: 0, opacity: 1, ease: "power3.out", stagger: 0.04}, '-=1')
                    .set('.loadPanel', {opacity: 0, display:'none'})

            });
            
        },



        leave({ current, next, trigger }) {

            return new Promise(resolve => {

                const timeline = gsap.timeline({
                    onComplete() {
                        resolve();
                    }
                });

                transitionPanel1.classList.add(`active`);
                mobileNav.classList.remove(`active`);
                menuIcon.classList.remove(`active`);

                timeline
                    .to('footer', {duration: 0.5, opacity: 0}, 0)
                    .to(current.container, {duration: 0.5, opacity: 0}, 0)
                    .to(current.container, {display: 'none'})

            });

        },



        beforeEnter({ current, next, trigger }) {

            scroll.scrollTo(0, 0);

        },



        enter({ current, next, trigger }) {

            imagesLoaded( 'body', function() {
                scroll.update();
            });

            return new Promise(resolve => {
                
                const timeline = gsap.timeline({
                    onComplete() {
                        transitionPanel1.classList.remove(`active`);
                        resolve();
                    }
                });

                timeline
                    .set(current.container, {opacity: 0})
                    .set(next.container, {opacity: 0})

            });
        },



        afterEnter({ current, next, trigger }) {

            return new Promise(resolve => {
                
                const timeline = gsap.timeline({
                    onComplete() {
                        resolve();
                    }
                });

                timeline
                    .to(next.container, {duration: 1, opacity: 1}, 0.5)
                    .to('footer', {duration: 1, opacity: 1}, 0.5)

            });
        },


        
    }],

    views: [{}],

    //debug: true
});