export default function createHero(srcPicture) {
    const field = document.getElementsByClassName('field-hero')[0];
    const hero = document.createElement('div');
    hero.classList.add('hero');
    hero.id = 'hero';
    let picture = document.createElement('img');
    picture.src = srcPicture;
    picture.classList.add('image');
    hero.appendChild(picture);
    //hero.textContent = 'Cowboy';
    field.appendChild(hero);
    return hero;
}
//module.export = createHero;