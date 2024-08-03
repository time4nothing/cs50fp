const buttons = document.getElementsByClassName("keypad-button");
const lights = document.getElementsByClassName("stagelights");

// reset game when reset button clicked
document.getElementById('reset').addEventListener('click', reset);

// activate keypad buttons if not locked
if (!locked) {
    // loop through array to find which button was hit and respond
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            const element = document.getElementById("output");
            let output = element.textContent;

            if (button.id === "enter") {
                // if enter is hit, validate entry
                validate(output);
            } else if (button.id === "backspace") {
                // if backspace is hit, remove end of number
                output = output.slice(0, -1);
                element.textContent = output;
            } else if (output.length < 8) {
                // if number length is less than 8, add to end of number
                output += button.id;
                element.textContent = output;
            } else {
                // flash output red for 2 seconds
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
        //console.log(Number(stage), currentStage);
        document.getElementById(`light${currentStage}`).setAttribute('class', 'light-on');
        //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
    }
    //console.log(document.getElementById(`light${currentStage}`).getAttribute('class'));
})

// POST to validate path to compare value with answer
async function validate(content) {
    try {
        console.log(content);
        await fetch("/validate", {
            method: "POST",
            body: JSON.stringify({ guess: content }),
            headers: { "Content-Type": "application/json" }
        });
    }
    catch (err) {
        console.log(err);
    }
}

// POST to reset path to clear variables, then reload page
// (refreshes page twice, but won't clear variables otherwise)
async function reset() {
    try {
        await fetch("/reset", {
            method: "POST"
        })
        location.reload();
    }
    catch (err) {
        console.log(err);
    }
}