function moveLoot(elem, y, speed) {
    //elem.link.style.transition = `transform ${speed}s linear`;
    elem.link.style.transition = `transform 1.1s linear`;
    elem.link.style.transform = `translate(${elem.x}px, ${y}px)`;
}
function changeMoveSpeed(elem, seconds) {
    elem.style.transition = ''//`transform ${seconds}s linear;`;
}
export {moveLoot, changeMoveSpeed}