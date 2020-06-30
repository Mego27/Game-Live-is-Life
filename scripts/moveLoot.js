export default function moveLoot(elem, y, speed) {
    elem.link.style.visibility = 'visible';
    elem.link.style.transition = `transform ${speed}s linear`;
    //elem.link.style.transition = `transform 3s linear`;
    elem.link.style.transform = `translate(${elem.x}px, ${y}px) rotate(${Math.floor(Math.random() * (1800+1800)) - 1800}deg)`;
}