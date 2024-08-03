const buttons = document.getElementsByClassName("keypad-button");
const lights = document.getElementsByClassName("stagelights");

// activate keypad buttons if not locked
if (!locked) {
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            const element = document.getElementById("output");
            let output = element.textContent;

            if (button.id === "enter") {
                // add submit code
                console.log("enter was hit");
            } else if (button.id === "backspace") {
                output = output.slice(0, -1);
                element.textContent = output;
            } else if (output.length < 8) {
                output += button.id;
                element.textContent = output;
            } else {
                element.style.color = "red";
                setTimeout(() => {
                    element.style.color = "white";
                }, 200);
            }
        })
    })
}

// light stage lights
Array.from(lights).forEach(light => {
    const stage = light.id.charAt(light.id.length - 1);
    if (Number(stage) <= currentStage) {
        console.log(Number(stage), currentStage);
        document.getElementById(`light${currentStage}`).setAttribute('class', 'light-on');
        console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
    }
    console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
})