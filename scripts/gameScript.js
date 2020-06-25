import createHero from './createHero.js'
import moveHero from './moveHero.js'
import createLoot from './createLoot.js';
import {moveLoot, changeMoveSpeed} from './moveLoot.js'

const loots = [];
let loot;
let heroX = 0;
let heightHero;
let heightGameField;
let defaultTimer = 10;
document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
const hero = createHero('./img/heroes/shooting-clipart-cow-boy-PNG.png');
hero.style.visibility = 'hidden';
const halfWidthHero = hero.offsetWidth/2;
let defaultIncrement = hero.offsetLeft/halfWidthHero*1.5;
let increment = defaultIncrement;
document.getElementsByClassName('button-start')[0].addEventListener('click', startGame.bind(null, hero, loot));
const scoreText = document.getElementsByClassName('score-label')[0];

window.onload = () => {
    let widthGameField = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).width.replace('px','');
    for(let i = 0; i < defaultTimer; i++) {
        loot = createLoot('./img/heroes/shooting-clipart-cow-boy-PNG.png', widthGameField);
        loots.push(loot);
        loot.link.style.top = '-' + loot.height + 'px';
        loot.link.style.transform = `translateX(${loot.x}px)`;
        console.log(loot.x);
    }
    console.log(loots)
}

function startGame(hero) {
    let currentTimer = defaultTimer;
    let score = 0;
    heightHero = window.getComputedStyle(hero, null).height;
    heightGameField = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).height;
    document.getElementsByClassName('button-start')[0].style.visibility = 'hidden';
    hero.style.visibility = 'visible';
    increment = defaultIncrement;
    let intervalTimer = setInterval(function() {
        currentTimer--;
        increment+=3;
        document.getElementById('timer').innerText = 'Timer(sec): ' + currentTimer;
        if (currentTimer === 0) {
            clearInterval(intervalTimer);
            clearInterval(intervalMovingElements);
            document.getElementsByClassName('button-start')[0].style.visibility = 'visible';
            hero.style.visibility = 'hidden';
            loot.link.style.visibility = 'hidden';
            document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
        }
    }, 1000);
    moveLoot(loot, loot.height + Number(heightGameField.replace('px','')));
    let intervalMovingElements = setInterval(function() {
        let matrix = window.getComputedStyle(loot.link, null).transform;
        matrix = matrix.split(/\(|,\s|\)/).slice(1,7);
        console.log(matrix[5]);
        if (heightGameField.replace('px','') - heightHero.replace('px','') < matrix[5]) {
            if (heightGameField.replace('px','') - heightHero.replace('px','')/2 
            > matrix[5]-loot.height/2) {
                if ((heroX - halfWidthHero < matrix[4]) &&
                (heroX + halfWidthHero > matrix[4])) {
                    score++;
                    scoreText.innerText = 'Score: ' + score;
                    loot.link.parentNode.removeChild(loot.link);
                    loot = null;
                    
                }
            }
            else if (heightGameField.replace('px','') < matrix[5]-loot.height/2) {
                loot.link.parentNode.removeChild(loot.link);
                loot = null;
            }
        }
        
        
    }, 50);
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
