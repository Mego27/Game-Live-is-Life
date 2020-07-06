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
    if (localStorage.getItem('isPlayedSounds') === 'false')
        return;
    let volume;
    if (localStorage.getItem('soundsVolume') !== 'NaN')
        volume = localStorage.getItem('soundsVolume')
    else volume = 0.3;
    let audio1 = new Audio();
    audio1.volume = volume;
    audio1.src = sounds1[Math.floor(Math.random() * (sounds1.length - 0)) + 0];
    if (arguments.length == 2) {
        let audio2 = new Audio();
        audio2.volume = volume;
        audio2.src = sounds2[Math.floor(Math.random() * (sounds2.length - 0)) + 0];
        audio1.addEventListener('ended', () => {audio2.play()});
    }
    audio1.play();
}
function changeInstanceSounds(button) {
    console.log(localStorage.getItem('isPlayedSounds'));
    if (localStorage.getItem('isPlayedSounds') === 'true') {
        localStorage.setItem('isPlayedSounds', false);
    }
    else {
        localStorage.setItem('isPlayedSounds', true);
    }
    updateMutingIcon(localStorage.getItem('isPlayedSounds'), button);
}
function updateMutingIcon(isMute, button) {
    if (isMute === 'true') {
        button.innerHTML = '<svg viewBox="0 0 347.182 347.182"><g><path d="M277.808,5.426C274.187,1.809,269.902,0,264.954,0c-4.945,0-9.233,1.809-12.847,5.426L157.034,100.5H82.233   c-4.952,0-9.235,1.809-12.851,5.424c-3.617,3.621-5.426,7.901-5.426,12.85v109.634c0,4.948,1.809,9.232,5.426,12.847   c3.619,3.617,7.902,5.428,12.851,5.428h74.798l95.07,95.077c3.62,3.61,7.904,5.421,12.847,5.421c4.955,0,9.236-1.811,12.854-5.421   c3.613-3.617,5.424-7.901,5.424-12.847V18.276C283.225,13.328,281.421,9.042,277.808,5.426z"/></g></svg>';
    }
    else {
        button.innerHTML = '<svg viewBox="0 0 448.075 448.075"><path d="M352.021,16.075c0-6.08-3.52-11.84-8.96-14.4c-5.76-2.88-12.16-1.92-16.96,1.92l-141.76,112.96l167.68,167.68V16.075z"/><path d="M443.349,420.747l-416-416c-6.24-6.24-16.384-6.24-22.624,0s-6.24,16.384,0,22.624l100.672,100.704h-9.376  c-9.92,0-18.56,4.48-24.32,11.52c-4.8,5.44-7.68,12.8-7.68,20.48v128c0,17.6,14.4,32,32,32h74.24l155.84,124.48  c2.88,2.24,6.4,3.52,9.92,3.52c2.24,0,4.8-0.64,7.04-1.6c5.44-2.56,8.96-8.32,8.96-14.4v-57.376l68.672,68.672  c3.136,3.136,7.232,4.704,11.328,4.704s8.192-1.568,11.328-4.672C449.589,437.131,449.589,427.019,443.349,420.747z"/></svg>';
    }
}

export {changeInstanceMusic, playSound, changeInstanceSounds, updateMutingIcon}