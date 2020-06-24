function moveLoot(elem, x) {
    //elem.style.top = x + Number(elem.style.top.replace('px','')) + 'px';
    elem.style.transform = `translateY(${x}px)`;
}
function changeMoveSpeed(elem, seconds) {
    elem.style.transition = ''//`transform ${seconds}s linear;`;
}
export {moveLoot, changeMoveSpeed}