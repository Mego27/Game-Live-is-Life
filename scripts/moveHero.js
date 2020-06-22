export default function moveHero(hero, x, direction) {
    hero.style.transform = `translateX(${x}px) scaleX(${direction})`;
}
//module.export = createHero;