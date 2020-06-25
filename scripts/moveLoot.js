function moveLoot(elem, y) {
    //elem.style.top = x + Number(elem.style.top.replace('px','')) + 'px';
    elem.link.style.transition = 'transform 7s linear';
    elem.link.style.transform = `translate(${elem.x}px, ${y}px)`;
    console.log(`translate(${elem.x}px, ${y}px)` , elem.link.style.transition);
}
function changeMoveSpeed(elem, seconds) {
    elem.style.transition = ''//`transform ${seconds}s linear;`;
}
export {moveLoot, changeMoveSpeed}