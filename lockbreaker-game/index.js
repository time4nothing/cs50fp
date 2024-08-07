import express from 'express';

const app = express();
const port = 7001;

let locked = true;
let stage = 2;
let name = '';
let output = '';
let timer = -1;
let flash = false;
let flashButtons = false;

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend

// initial page render
app.get('/', (req, res) => {
    console.log(name, locked);
    res.render('index.ejs', { locked: locked, stage: stage, name: name, output: output, timer: timer, flash: flash, flashButtons: flashButtons });
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
            validate(output);
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
    locked = true;
    flashButtons = false;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});

function validate(content) {
    timer = Date.now() + (12*60*60*1000);
    console.log(timer);
    console.log(content);
}