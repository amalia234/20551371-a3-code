console.log("JavaScript is working!")

// initialisation w/vanilla js 
new fullpage('#fullpage', {
    //options here
    autoScrolling:true, // ALWAYS seperate via common (,)
    scrollHorizontally: true,
    navigation: true, // https://alvarotrigo.com/fullPage/docs/#initialization to find possible features of vanilla
    navigationTooltips: ['Home','Remember','Summary', 'Symptoms', 'Hidden', 'Tips', 'Resources'], // done in array
    showActiveTooltip: true,
    slidesNavigation: true, // 'if TRUE, displays navigation bar made of SMALL CIRCLES for each screen'

    onLeave: function(origin, destination, direction){ //'callback is fired once the user leaves a section, in the transition to the new section.'
        //console.log("on leave!")
        if(destination.index == 1){
            //console.log("big three section")
            rememberSection(destination) //important for scrolling
        }
        else if(destination.index == 2){
            //console.log("summary section")
            summarySection(destination)
        }
        else if(destination.index == 3){
            //console.log("summary section")
            symptomsSection(destination)
        }
        else if(destination.index == 4){
            //console.log("summary section")
            hiddenSection(destination)
        }
        else if(destination.index == 5){
            //console.log("summary section")
            tipsSection(destination)
        }
        else if(destination.index == 6){
            //console.log("summary section")
            resourcesSection(destination)
        }
    }, //don't forget comma (,) to seperate

    afterRender: () => { //'callback is fired upon loading the page'
        homeSection()
    },
});

//--------------------------------------------------------------------------------------------------------------------- start of animations //

// ---------------------------------------------------------------------------------------------------------home section animations

//for making eyes follow cursor animation
// USED TUTORIAL FOR ANIMATING EYES TO CURSOR FEATURE:
// Beyond Fireship 2022. https://www.youtube.com/watch?v=TGe3pS5LqEw
document.addEventListener('mousemove', (e) => { //tracks movement of user's cursor 
    console.log(e)

    const mouseX = e.clientX; //x variable of cursor position
    const mouseY = e.clientY; //y variable of cursor position

    const anchor = document.getElementById('anchor') //calculate position of anchor element
    const rekt = anchor.getBoundingClientRect(); //gives us box 'drawn' around the anchor image
    const anchorX = rekt.left + rekt.width / 2; //to get middle of that box:
    const anchorY = rekt.top + rekt.height /2;
    const eyes = document.querySelectorAll('.eye') //to rotate eyes

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY); //need to call angle function

    console.log(angleDeg)
    
    eyes.forEach(eye => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`; //setting style transform rotate property
    })
})

function angle(cx, cy, ex, ey){ //function that takes in cursor coordinates, and middleofbaseimage coordinates
    const dy = ey - cy; //SUBTRACT x AND y values from each other
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx); //range [-PI, PI] AKA angle between the two in radian. HOWEVER css needs it in degrees
    const deg = rad * 180 / Math.PI; // easily convert from radian to degrees. range (-180, 180)
    return deg;
}

//other animations
function homeSection(){
    //console.log("homepage section!")
    //gsap create timeline for animation
    const tl = new TimelineMax({delay: 0.5}) //each animation in timeline has 0.5s delay

    //animate elements -> these all happen in sequence
    tl.from('#blur-home-bg', {opacity: 0, duration: 1}) //fades in WITH 1s duration
        .from('.section-home .content', {y: 30, opacity: 0, duration: 1}, "-=1.2") //'-=1' jump a second (1s) earlier
        .from('#fp-nav', {opacity: 0, duration: 1})
        .from('.face', {opacity: 0, duration: 1}, "-=1.2")
}

// ---------------------------------------------------------------------------------------------------------remember section animations
function rememberSection(destination){ //happens everytime user goes to destination/section
    console.log("remember section!")
    // get elements
    let section = destination.item //we just want the 'item' inside the object, returns WHOLE div > make sure to put first so can search inside div
    let heading = section.querySelector('h1') //search inside 'section' instead of whole 'document' > saves time
    let content = section.querySelector('.content')
    let btCol = section.querySelector('.bt-col')

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0})
        .from(btCol, {y:'-50', duration: 0.5, opacity: 0, stagger: 3}) //'stagger' makes it seem like it recoiled
        .from(content, {duration: 1, y: 30, opacity: 0}, '-=1')
}

// ---------------------------------------------------------------------------------------------------------summary section animations
function summarySection(destination){ 
    console.log("summary section!")

    let section = destination.item 
    let heading = section.querySelector('h1') 
    let chara = section.querySelector('#chara-summary')
    let p = section.querySelector('p')

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0})
        .fromTo(chara, {opacity: 0, x: 150}, {opacity: 1, x:0, duration: 1.5}, '-=0.5') //from ONE PROPERTY to another PROPERTY. therefore needs two(2) '{}'
        .from(p, {duration: 1, y: 300, opacity: 0}, '-=1')
}

// ---------------------------------------------------------------------------------------------------------symptoms section animations
function symptomsSection(destination){ 
    console.log("symptoms section!")

    let section = destination.item 
    let heading = section.querySelector('h1') 
    let flowers = section.querySelector('#flowers-symptoms')

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0}) //moves from 500 x-axis to 0 (right to left)
        .from(flowers, {duration: 2, y: 100, opacity: 0, easing: 'easeInOutExpo'}, '-=0.5') //moves from 100 y-axis to 0 (down to up), USING easeInOutExpo graph style
}

// ---------------------------------------------------------------------------------------------------------hidden section animations
function hiddenSection(destination){ 
    console.log("hidden section!")

    let section = destination.item 
    let heading = section.querySelector('h1') 
    let chara = section.querySelector('#chara-symptoms2')

    let btns = section.querySelector('.btns')

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0})
        .from(chara, {duration: 1, y: 200, opacity: 0}, '-=0.4')
        .from(btns, {duration: 1, opacity: 0}, '-=0.4') //fade in buttons
}

// ---------------------------------------------------------------------------------------------------------tips section animations
function tipsSection(destination){ 
    console.log("tips section!")

    let section = destination.item 
    let heading = section.querySelector('h1') 

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0})
}

// ---------------------------------------------------------------------------------------------------------resources section animations 
function resourcesSection(destination){
    console.log("resources section!")

    let section = destination.item 
    let heading = section.querySelector('h1') 
    let info = section.querySelector('.resources-info')

    // animate
    const tl = new TimelineMax({delay: 0.5})
    tl.from(heading, {duration: 1, x: 500, opacity: 0})
        .from(info, {duration: 1, y: 300, opacity: 0}, '-=1')
}

// jump to button ---------------------

// jump to section 3 btn
let jumptoS3Btns = document.querySelectorAll('.jumpto-s3')
jumptoS3Btns.forEach(btn => {
    btn.addEventListener('click', () => {
        fullpage_api.moveTo(3); //doesn't use index form (aka '3' NOT '2')
    })
})

// carousel ---------------------
new Glider(document.querySelector('.glider1'), { //PROPERTIES of 1st carousel
    slidesToShow: 3, //show 3 items on 1 screen of the carousel
    slidesToScroll: 1, //shows 1 item every scroll (via next/prev buttons)
    draggable: true, //can drag with cursor
    rewind: true, //loops once user reaches end of carousel

    dots: '#dots1', //shows progress dots (which screen of carousel user is on)
    arrows: { //SET arrow elements
      prev: '.glider1-prev',
      next: '.glider1-next'
    }
  })

new Glider(document.querySelector('.glider2'), { //PROPERTIES of 2nd carousel
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    rewind: true,

    dots: '#dots2',
    arrows: {
      prev: '.glider2-prev',
      next: '.glider2-next'
    }
  })

  // menu ---------------------
document.addEventListener('DOMContentLoaded', function () {
    let menuItems = document.querySelectorAll('#menu a'); //selects all <a> elements that are in the '#menu' id

    menuItems.forEach(function (menuItem, index) { //for each menu item, it performs a function that takes in 'menuItem' and its 'index'
        menuItem.addEventListener('click', function () { 
            fullpage_api.moveTo(index + 1); // FullPage.js starts counting from 1. when menu item is CLICKED, triggers next screen to be displayed
        });
    });
});