function changeInstanceMusic(audioId, button) {
    if (audioId.paused) {
        button.innerHTML = '<svg viewbox="0 0 478 478"><g><g><path d="M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533    c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z"/></g></g><g><g><path d="M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533    c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z"/></g></g></svg>';
        audioId.play();
    }
    else {
        button.innerHTML = '<svg viewbox="0 0 42 42"><path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/></svg>';
        audioId.pause();
    }
}
function playSound(sounds1, sounds2) {
    let audio1 = new Audio();
    audio1.volume = .3;
    audio1.src = sounds1[Math.floor(Math.random() * (sounds1.length - 0)) + 0];
    if (arguments.length == 2) {
        let audio2 = new Audio();
        audio2.volume = .3;
        audio2.src = sounds2[Math.floor(Math.random() * (sounds2.length - 0)) + 0];
        audio1.addEventListener('ended', () => {audio2.play()});
    }
    audio1.play();
}

export {changeInstanceMusic, playSound}