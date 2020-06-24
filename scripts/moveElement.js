export default function moveElement(elem, x) {
    elem.style.top = x + Number(elem.style.top.replace('px','')) + 'px';
}