import createHero from './createHero.js'
import moveHero from './moveHero.js'
import createElement from './createElement.js';
import moveElement from './moveElement.js'

let heroX = 0;
let heightElem;
let heightHero;
let defaultTimer = 15;
document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
const hero = createHero('./img/heroes/shooting-clipart-cow-boy-PNG.png');
hero.style.visibility = 'hidden';
let elem = createElement('./img/heroes/shooting-clipart-cow-boy-PNG.png');
elem.style.visibility = 'hidden';
const halfWidthHero = hero.offsetWidth/2;
let defaultIncrement = hero.offsetLeft/halfWidthHero*1.5;
let increment = defaultIncrement;
document.getElementsByClassName('button-start')[0].addEventListener('click', startGame.bind(null, hero, elem));
let timer2= 10;

function startGame(hero, elem) {
    let currentTimer = defaultTimer;
    heightElem = window.getComputedStyle(elem, null).height;
    heightHero = window.getComputedStyle(hero, null).height;
    timer2 = 10;
    document.getElementsByClassName('button-start')[0].style.visibility = 'hidden';
    hero.style.visibility = 'visible';
    elem.style.top = '-' + heightElem;
    elem.style.visibility = 'visible';
    increment = defaultIncrement;
    let intervalTimer = setInterval(function() {
        currentTimer--;
        increment+=3;
        document.getElementById('timer').innerText = 'Timer(sec): ' + currentTimer;
        if (currentTimer === 0) {
            clearInterval(intervalTimer);
            document.getElementsByClassName('button-start')[0].style.visibility = 'visible';
            hero.style.visibility = 'hidden';
            elem.style.visibility = 'hidden';
            document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
        }
    }, 1000);
    let intervalMovingElements = setInterval(function() {
        moveElement(elem, increment/5);
    }, 10)
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight' && 
    document.getElementById('hero').offsetLeft > heroX) {
        if (document.getElementById('hero').offsetLeft >= heroX+increment)
            heroX+=increment;
        else heroX = document.getElementById('hero').offsetLeft;
        moveHero(hero, heroX, 1);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft' && 
    -document.getElementById('hero').offsetLeft < heroX) {
        if (-document.getElementById('hero').offsetLeft <= heroX-increment)
            heroX-=increment;
        else heroX = -document.getElementById('hero').offsetLeft;
        moveHero(hero, heroX, -1);
    }
});
