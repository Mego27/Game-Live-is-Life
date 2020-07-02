import createHero from './createHero.js'
import moveHero from './moveHero.js'
import createLoot from './createLoot.js'
import moveLoot from './moveLoot.js'
import {changeInstanceMusic, playSound} from './controlAudio.js'

const imagesLoots = ['./img/loots/whiskey2v3.png',
'./img/loots/tequila.png',
'./img/loots/beer.png',
'./img/loots/yager.png']
const sounds = {
    bung: ['./sounds/bung1.mp3',
        './sounds/bung2.mp3'],
    sip: ['./sounds/sip1.mp3',
        './sounds/sip2.mp3'],
    breaking: ['./sounds/breaking1.mp3',
        './sounds/breaking2.mp3',
        './sounds/breaking3.mp3']
};
const loots = [];
let loot;
let heroX = 0;
let heightHero;
let heightGameField;
let maxHeightLoot;
let widthGameField;
let defaultTimer = 60;
let defaultSpeed = 5;
document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
let hero = createHero('./img/heroes/brunet-cowboy.png');
//let hero = createHero('./img/heroes/blond-cowboy.png');
hero.style.visibility = 'hidden';
let halfWidthHero = hero.offsetWidth/2;
let defaultIncrement = hero.offsetLeft/halfWidthHero*1.5;
let increment = defaultIncrement;
document.getElementsByClassName('button-start')[0].addEventListener('click', startGame.bind(null, hero));
const scoreText = document.getElementsByClassName('score-label')[0];
const btnAudioMain = document.getElementsByClassName('play-pause-music')[0];

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

function startGame() {
    let hero = document.getElementById('hero');
    updateSizeLoot(loots, maxHeightLoot);
    let currentTimer = defaultTimer;
    let speed = defaultSpeed;
    let score = 0;
    let index = 0;
    heightHero = window.getComputedStyle(hero, null).height.replace('px','');
    heightGameField = window.getComputedStyle(document.getElementsByClassName('game-field')[0], null).height.replace('px','');
    document.getElementsByClassName('button-start')[0].style.visibility = 'hidden';
    document.getElementsByClassName('settings')[0].style.opacity = '0';
    hero.style.visibility = 'visible';
    let intervalTimer = setInterval(function() {
        currentTimer--;
        /*speed-=0.05;
        increment+=2;*/
        console.log(speed, increment);
        document.getElementById('timer').innerText = 'Timer(sec): ' + currentTimer;
        if (currentTimer === 0) {
            clearInterval(intervalTimer);
            clearInterval(intervalMovingElements);
            updateSizeLoot(loots, maxHeightLoot)
            console.log(loots)
            document.getElementsByClassName('button-start')[0].style.visibility = 'visible';
            hero.style.visibility = 'hidden';
            loots[index].link.style.visibility = 'hidden';
            document.getElementsByClassName('settings')[0].style.opacity = "1";
            document.getElementById('timer').innerText = 'Timer(sec): ' + defaultTimer;
        }
    }, 1000);
    moveLoot(loots[index], loots[index].height + Number(heightGameField), speed);
    let intervalMovingElements = setInterval(function() {
        let matrix = window.getComputedStyle(loots[index].link, null).transform;
        matrix = matrix.split(/\(|,\s|\)/).slice(1,7);
        //console.log(matrix[5]);
        if (heightGameField - heightHero < matrix[5]) {
            if (heightGameField - heightHero/2 
            > matrix[5]-loots[index].height/2) {
                if ((heroX - halfWidthHero < matrix[4]) &&
                (heroX + halfWidthHero > matrix[4])) {
                    playSound(sounds.bung);
                    playSound(sounds.sip);
                    score+=loots[index].count;
                    speed-=0.1;
                    increment+=2;
                    scoreText.innerText = 'Score: ' + score;
                    updateLoot(loots, index, widthGameField);
                    index++;
                    moveLoot(loots[index], loots[index].height + Number(heightGameField), speed);
                }
            }
            else if (heightGameField <= matrix[5]-loots[index].height*0.9) {
                playSound(sounds.breaking);
                updateLoot(loots, index, widthGameField);
                index++;
                moveLoot(loots[index], loots[index].height + Number(heightGameField), speed);
            }
            /*else if (trying > 5) {
                updateLoot(loots, index, widthGameField);
                console.log9
                console.log(trying,'+++++++++++')
                index++;
                moveLoot(loots[index], loots[index].height + Number(heightGameField), speed);
            }
            else trying++;*/
        }
        
        
    }, 20);
}

function updateHero() {
    let hero = document.getElementById('hero');
    hero.parentNode.removeChild(hero);
    for (let i = 0; i < document.getElementsByName('hero').length; i++) {
        if (document.getElementsByName('hero')[i].checked && document.getElementsByName('hero')[i].value === "brunet") {
            hero = createHero('./img/heroes/brunet-cowboy.png');
        }
        if (document.getElementsByName('hero')[i].checked && document.getElementsByName('hero')[i].value === "blond") {
            hero = createHero('./img/heroes/blond-cowboy.png');
        }
    }
    hero.style.visibility = 'hidden';
    halfWidthHero = hero.offsetWidth/2;
    defaultIncrement = hero.offsetLeft/halfWidthHero*1.5;
    increment = defaultIncrement;
}

btnAudioMain.addEventListener('click', changeInstanceMusic.bind(null, document.getElementById('main-song'), btnAudioMain))

document.getElementsByName('hero').forEach(element => {
    element.addEventListener('change', updateHero);
});

document.addEventListener('keydown', function(event) {
    let hero = document.getElementById('hero');
    if (event.code === 'ArrowRight' && 
    hero.offsetLeft > heroX) {
        if (hero.offsetLeft >= heroX+increment)
            heroX+=increment;
        else heroX = hero.offsetLeft;
        moveHero(hero, heroX, 1);
    }
});

document.addEventListener('keydown', function(event) {
    let hero = document.getElementById('hero');
    if (event.code === 'ArrowLeft' && 
    -hero.offsetLeft < heroX) {
        if (-hero.offsetLeft <= heroX-increment)
            heroX-=increment;
        else heroX = -hero.offsetLeft;
        moveHero(hero, heroX, -1);
    }
});