import express from 'express';

const app = express();
const port = 7001;

let locked = true;
let stage = 2;
let name = '';
let output = '';
let timer = '12:00:00';
let flash = false;

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend
app.use(express.json());

// initial page render
app.get('/', (req, res) => {
    console.log(name, locked);
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage, output: output, timer: timer, flash: flash });
});

// collect submitted name and unlock keypad
app.post('/', (req, res) => {
    name = req.body.name;
    if (name) {
        locked = false;
    }
    res.redirect('/');
});

app.post('/validate', (req, res) => {
    const pressedButton = req.body.button;
    if (!locked) {
        flash = false;
        console.log(pressedButton);
        if (pressedButton === "enter") {
            // if enter is hit, validate entry
            console.log("enter hit")
        } else if (pressedButton === "backspace") {
            // if backspace is hit, remove end of number
            output = output.slice(0, -1);
        } else if (output.length < 8) {
            // if number length is less than 8, add to end of number
            output += pressedButton;
        } else {
            flash = true;
        }
        console.log(output);
    }
    res.redirect('/');
});

// clear variables and redirect to root
app.post('/reset', (req, res) => {
    name = "";
    output = "";
    locked = true;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});