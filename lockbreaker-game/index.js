import express from 'express';

const app = express();
const port = 7001;

let locked = true;
let stage = 2;
let name = '';

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend

// initial page render
app.get('/', (req, res) => {
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage });
});

// collect submitted name and unlock keypad
app.post('/', (req, res) => {
    name = req.body.name;
    if (name) {
        locked = false;
    }
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage });
});

app.post('/validate', (req, res) => {
    console.log(req.body, "Enter clicked");
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage });
});

app.post('/reset', (req, res) => {
    console.log("reset pressed");
    name = "";
    locked = true;
    res.render('index.ejs', { name: name, lockStatus: locked, stage: stage });
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});