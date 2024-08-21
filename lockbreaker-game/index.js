import express from 'express';

const app = express();
const port = 7001;

const code = {
    1: 45846846,
    2: 78945612,
    3: 12345678
}

let locked = true;
let stage = 2;
let name = '';
let output = '';
let outputColored = [];
let timer = -1;
let flash = false;
let flashButtons = false;

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend

// initial page render
app.get('/', (req, res) => {
    res.render('index.ejs', { locked: locked, stage: stage, name: name, output: output, outputColored: outputColored, timer: timer, flash: flash, flashButtons: flashButtons });
});

// collect submitted name and unlock keypad
app.post('/', (req, res) => {
    name = req.body.name;
    flashButtons = false;
    if (name && timer < 0) {
        locked = false;
    } else {
        flashButtons = true;
        output = 'ERROR'
    }
    res.redirect('/');
});

app.post('/validate', (req, res) => {
    const pressedButton = req.body.button;
    if (!locked) {
        flash = false;
        if (pressedButton === "enter") {
            outputColored = validate(output);
            console.log(outputColored);
            locked = true;
        } else if (pressedButton === "backspace") {
            // if backspace is hit, remove end of number
            output = output.slice(0, -1);
        } else if (output.length < 8) {
            // if number length is less than 8, add to end of number
            output += pressedButton;
        } else {
            flash = true;
        }
    }
    res.redirect('/');
});

// clear variables and redirect to root
app.post('/reset', (req, res) => {
    name = "";
    output = "";
    outputColored = {};
    locked = true;
    flashButtons = false;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});

// function to validate input
function validate(content) {
    let validation = [];
    timer = Date.now() + (12*60*60*1000); // 12 hrs from current time

    const outputArray = output.split('');
    const codeString = code[stage].toString();
    const codeArray = codeString.split('');
    outputArray.forEach((num, index) => {
        if (codeString.search(num) === -1) {
            validation[index] = {
                number: num,
                match: 'white'
            }
        } else {
            validation[index] = {
                number: num,
                match: 'yellow'
            }
        }
        if (outputArray[index] === codeArray[index]) {
            validation[index] = {
                number: num,
                match: 'green'
            }
        }
    })

    return validation;
}