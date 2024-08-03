import express from 'express';

const app = express();
const port = 7001;

let locked = true;
let stage = 2;
let name = '';

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend
app.use(express.json());

// initial page render
app.get('/', (req, res) => {
    console.log(name, locked);
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage });
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
    let output = req.body.guess;
    locked = true;
    console.log(locked, output);
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage, output: output });
});

// clear variables and redirect to root
app.post('/reset', (req, res) => {
    console.log("reset pressed");
    name = "";
    locked = true;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});