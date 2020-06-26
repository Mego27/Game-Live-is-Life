import createHero from './createHero.js'
import moveHero from './moveHero.js'
import createLoot from './createLoot.js';
import {moveLoot, changeMoveSpeed} from './moveLoot.js'

const imagesLoots = ['./img/loots/whiskey2.png',
'./img/loots/tequila.png',
'./img/loots/beer.png',
'./img/loots/yager.png']
const loots = [];
let loot;
let heroX = 0;
let heightHero;
let heightGameField;
let maxHeightLoot;
let widthGameField;
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
    widthGameField = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).width.replace('px','');
    maxHeightLoot = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).height.replace('px','')*0.07;
    for(let i = 0; i < defaultTimer; i++) {
        let src = randomImageLoot(imagesLoots);
        loot = createLoot(src, widthGameField, maxHeightLoot);
        loot.link.style.top = '-' + loot.height + 'px';
        loot.link.style.transform = `translateX(${loot.x}px)`;
        loots.push(loot);
    }
    console.log(loots)
}

function randomImageLoot(images) {
    return images[Math.floor(Math.random() * (images.length - 0)) + 0];
}

function updateLoot(loots, index, width) {
    loots[index].link.parentNode.removeChild(loots[index].link);
    loots[index] = createLoot(randomImageLoot(imagesLoots), width);
    loots[index].link.style.top = '-' + loots[index].height + 'px';
    loots[index].link.style.transform = `translateX(${loots[index].x}px)`;
}

function updateSizeLoot(loots, maxHeightLoot) {
    loots.forEach(element => {
        if (element.picture.height > maxHeightLoot) {
            element.picture.height = maxHeightLoot;
            element.height = maxHeightLoot;
            element.link.style.top = '-' + element.height + 'px';
        }
    })
}

function choiceNewLoot(loots) {
    loots.forEach(element => {
        if (element !== undefined)
            {console.log(element);return element;}
        else element = createLoot(randomImageLoot(), widthGameField);
    });
    return 0
}

function startGame(hero) {
    updateSizeLoot(loots, maxHeightLoot);
    let currentTimer = defaultTimer;
    let score = 0;
    let index = 0;
    heightHero = window.getComputedStyle(hero, null).height.replace('px','');
    heightGameField = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).height.replace('px','');
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
            updateSizeLoot(loots, maxHeightLoot)
            console.log(loots)
            document.getElementsByClassName('button-start')[0].style.visibility = 'visible';
            hero.style.visibility = 'hidden';
            loots[index].link.style.visibility = 'hidden';
            document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
        }
    }, 1000);
    moveLoot(loots[index], loots[index].height + Number(heightGameField), 5);
    let trying = 0;
    let intervalMovingElements = setInterval(function() {
        let matrix = window.getComputedStyle(loots[index].link, null).transform;
        matrix = matrix.split(/\(|,\s|\)/).slice(1,7);
        console.log(matrix[5]);
        if (heightGameField - heightHero < matrix[5]) {
            if (heightGameField - heightHero/2 
            > matrix[5]-loots[index].height/2) {
                if ((heroX - halfWidthHero < matrix[4]) &&
                (heroX + halfWidthHero > matrix[4])) {
                    score++;
                    scoreText.innerText = 'Score: ' + score;
                    updateLoot(loots, index, widthGameField)
                    index++;
                    moveLoot(loots[index], loots[index].height + Number(heightGameField), 5);
                }
            }
            else if (heightGameField < matrix[5]-loots[index].height/2) {
                updateLoot(loots, index, widthGameField)
                index++;
                moveLoot(loots[index], loots[index].height + Number(heightGameField), 5);
            }
            else if (trying > 5) {
                updateLoot(loots, index, widthGameField);
                console.log(trying,'++++')
                index++;
                moveLoot(loots[index], loots[index].height + Number(heightGameField), 5);
            }
            else trying++;
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
