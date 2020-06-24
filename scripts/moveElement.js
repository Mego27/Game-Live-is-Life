export default function moveElement(elem, x) {
    elem.style.top = x + Number(elem.style.top.replace('px','')) + 'px';
    //console.log(x + Number(elem.style.top.replace('px','')) + 'px');
}
//module.export = createHero;