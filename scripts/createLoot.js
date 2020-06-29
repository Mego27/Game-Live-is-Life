export default function createLoot(srcPicture, width, height) {
    let data = {};
    const field = document.getElementsByClassName('game-field')[0];
    const element = document.createElement('div');
    data.link = element;
    element.classList.add('element');
    element.id = 'element';
    element.style.visibility = 'hidden';
    let borderDiv = document.createElement('div');
    let picture = document.createElement('img');
    data.picture = picture;
    picture.src = srcPicture;
    borderDiv.classList.add('image-element');
    borderDiv.appendChild(picture);
    element.appendChild(borderDiv);
    //hero.textContent = 'Cowboy';
    field.appendChild(element);
    data.height = picture.height;
    data.width = picture.width;
    data.x = Math.floor(Math.random() * (width/2 - (-width/2))) - width/2;
    return data;
}

//module.export = createHero;