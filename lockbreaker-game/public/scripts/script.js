// countdown timer
const countdown = setInterval(() => {
    const timeLeft = timerEnd - Date.now();
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const display = `${hours}:${minutes}:${seconds}`;

    if (timeLeft >= 0) {
        document.getElementById('timer').innerHTML = display;
    }
}, 1000);

// disable and fade keypad buttons if locked
if (lockedStatus) {
    const buttons = document.getElementsByClassName('keypad-button');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
        button.style.color = "#a9a9a9";
    })
}

// flash keypad if trying to unlock when timer not done
if (flashButtonsStatus) {
    const buttons = document.getElementsByClassName('keypad-button');
    Array.from(buttons).forEach(button => {
        button.style.color = "red";
        setTimeout(() => {
            button.style.color = "#a9a9a9";
        }, 200);
    })
}

// flash output numbers if max reached
if (flashStatus) {
    const flasher = document.getElementById('output');
    flasher.style.color = "red";
    setTimeout(() => {
        flasher.style.color = "white";
    }, 200);
}

// light stage light
const lights = document.getElementsByClassName("stagelights");

Array.from(lights).forEach((light, index) => {
    if (index <= currentStage) {
        document.getElementById(`light${index}`).setAttribute('class', 'light-on');
        //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
    }
    //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
})