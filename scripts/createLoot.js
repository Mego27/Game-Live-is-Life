export default function createLoot(srcPicture, width) {
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
    let random = Math.floor(Math.random() * (width/2 - (-width/2))) - width/2;
    let data = {
        link: element,
        height: picture.height,
        width: picture.width,
        x: random
    };
    console.log(picture.height);
    return data;
}

//module.export = createHero;