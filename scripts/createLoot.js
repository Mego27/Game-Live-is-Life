export default function createLoot(srcPicture) {
    const field = document.getElementsByClassName('game-field')[0];
    const element = document.createElement('div');
    element.classList.add('element');
    element.id = 'element';
    let borderDiv = document.createElement('div');
    let picture = document.createElement('img');
    picture.src = srcPicture;
    borderDiv.classList.add('image-element');
    borderDiv.appendChild(picture);
    element.appendChild(borderDiv);
    //hero.textContent = 'Cowboy';
    field.appendChild(element);
    let data = {
        link: element,
        height: picture.height,
        width: picture.width
    };
    return data;
}

//module.export = createHero;