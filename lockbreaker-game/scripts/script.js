const buttons = document.getElementsByClassName("keypad-button")

let locked = false;

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