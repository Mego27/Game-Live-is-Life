import createHero from './createHero.js'
import moveHero from './moveHero.js'
let heroX = 0;
let timer = 60;
const hero = createHero('./img/heroes/shooting-clipart-cow-boy-PNG.png');
const halfWidthHero = document.getElementById('hero').offsetWidth/2;
let increment = document.getElementById('hero').offsetLeft/halfWidthHero*1.5;
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight' && 
    document.getElementById('hero').offsetLeft-halfWidthHero >= heroX+increment) {
        heroX+=increment;
        moveHero(hero, heroX, 1);
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft' && 
    -document.getElementById('hero').offsetLeft+halfWidthHero <= heroX-increment) {
        heroX-=increment;
        moveHero(hero, heroX, -1);
    }
});
let interval = setInterval(function() {
    timer--;
    document.getElementById('timer').innerText = 'Timer(sec): ' + timer;
    if (timer === 0) clearInterval(interval);
}, 1000);