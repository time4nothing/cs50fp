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
    } else {
        clearInterval(countdown);
    }
}, 1000);

// disable and fade keypad buttons if locked
if (lockedStatus) {
    const buttons = document.getElementsByClassName('keypad-button');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
        button.style.color = '#a9a9a9';
    })
}

// flash keypad if trying to unlock when timer not done
if (flashButtonsStatus) {
    const buttons = document.getElementsByClassName('keypad-button');
    const error = document.getElementById('output');
    Array.from(buttons).forEach(button => {
        button.style.color = 'red';
        error.innerHTML = 'ERROR';
        setTimeout(() => {
            button.style.color = '#a9a9a9';
        }, 300);
        setTimeout(() => {
            error.innerHTML = outputCode;
        }, 1200);
    })
}

// flash output numbers if max reached
if (flashOutputStatus) {
    const flasher = document.getElementById('output');
    flasher.style.color = 'red';
    setTimeout(() => {
        flasher.style.color = 'white';
    }, 200);
}

// light stage lights
if (currentStage == 4) {
    // cycle lights if game over
    document.getElementById('output').innerHTML = 'SOLVED';
    document.getElementById('output').classList.add('gameover');
    let blink = 1;
    setInterval(() => {
        if (blink == 4) {
            blink = 1;
        }
        document.getElementById(`light${blink}`).setAttribute('class', 'light-on');
        setTimeout(() => {
            document.getElementById(`light${blink}`).setAttribute('class', 'light-off');
            blink += 1;
        }, 300);
    }, 350);
} else {
    // light current stage
    document.getElementById(`light${currentStage}`).setAttribute('class', 'light-on');
}

// set color of result lights
if (resultArray.length > 1) {
    const results = document.getElementsByClassName('resultLights');
    Array.from(results).forEach((result, index) => {
        document.getElementById(`result${index + 1}`).classList.add(resultArray[index]);
    })
}