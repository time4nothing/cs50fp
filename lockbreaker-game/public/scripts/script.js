// disable and fade keypad buttons if locked
if (locked) {
    const buttons = document.getElementsByClassName('keypad-button');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
        button.style.color = "#a9a9a9";
    })
}

if (flash) {
    // flash output numbers red for 2 seconds
    const flasher = document.getElementById('output');
    flasher.style.color = "red";
    setTimeout(() => {
        flasher.style.color = "white";
    }, 200);
}

// light stage light
const lights = document.getElementsByClassName("stagelights");

Array.from(lights).forEach(light => {
    const stage = light.id.charAt(light.id.length - 1);
    if (Number(stage) <= currentStage) {
        //console.log(Number(stage), currentStage);
        document.getElementById(`light${currentStage}`).setAttribute('class', 'light-on');
        //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
    }
    //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
})