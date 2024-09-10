import express from 'express';

const app = express();
const port = 7001;

const code = 12345678

let locked = true;
let name = '';
let output = '';
let resultColors = [];
let timer = -1;
let flashOutput = false;
let flashButtons = false;

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend

// initial page render
app.get('/', (req, res) => {
    res.render('index.ejs', { locked: locked, name: name, output: output, resultColors: resultColors, timer: timer, flashOutput: flashOutput, flashButtons: flashButtons });
});

// collect submitted name and unlock keypad
app.post('/', (req, res) => {
    name = req.body.name;
    flashButtons = false;

    if (name && (timer - Date.now()) < 0) {
        output = '';
        locked = false;
    } else {
        flashButtons = true;
    }
    res.redirect('/');
});

app.post('/validate', (req, res) => {
    const pressedButton = req.body.button;
    if (!locked) {
        flashOutput = false;
        if (pressedButton === 'enter') {
            if (output.length < 8) {
                flashOutput = true;
            } else {
                resultColors = validate();
                locked = true;
            }
        } else if (pressedButton === 'backspace') {
            // if backspace is hit, remove end of number
            output = output.slice(0, -1);
        } else if (output.length < 8) {
            // if number length is less than 8, add to end of number
            output += pressedButton;
        } else {
            flashOutput = true;
        }
    }
    res.redirect('/');
});

app.post('/reset', (req, res) => {
    // clear variables and redirect to root
    name = '';
    output = '';
    resultColors = [];
    locked = true;
    flashButtons = false;
    timer = -1;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`"Electronic Lock Breaker" listening on port ${port}`);
});

// function to validate input
function validate() {
    let validation = [];
    //timer = Date.now() + (12*60*60*1000); // 12 hrs from current time
    timer = Date.now() + (60 * 1000); // 1 minute from current time

    // convert code number to string, then split strings to arrays for comparison
    const codeString = code.toString();
    let outputArray = output.split('');
    let codeArray = codeString.split('');

    // if output and code match, return validation array filled with 'match'
    if (output === codeString) {
        validation = Array(8).fill('match');
        return validation;
    }

    // setup variables to compare and create validation array
    let match = 0;
    let yes = 0;
    let outputNoMatch = [];
    let codeNoMatch = [];
    let validateColors = [];

    // check for matches, and calculate match count
    outputArray.forEach((num, i) => {
        if (outputArray[i] !== codeArray[i]) {
            outputNoMatch.push(outputArray[i]);
            codeNoMatch.push(codeArray[i]);
        }
    })
    match = 8 - outputNoMatch.length;

    // check for match but wrong place, increase yes count
    outputNoMatch.forEach((num, i) => {
        if (codeNoMatch.includes(num)) {
            yes += 1;
            const codeIndex = codeNoMatch.findIndex(e => e === num);
            codeNoMatch.splice(codeIndex, 1);
        }
    })

    // add 'match', 'yes', and 'no' to validation array
    for (let i = 1; i <= match; i++) { validateColors.push('match') };
    for (let i = 1; i <= yes; i++) { validateColors.push('yes') };
    const length = validateColors.length;
    for (let i = 8; i > length; i--) {
        validateColors.push('no');
    }
    validation = validateColors;

    return validation;
}