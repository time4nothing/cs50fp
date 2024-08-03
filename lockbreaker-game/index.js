import express from 'express';

const app = express();
const port = 7001;
let locked = true;
let stage = 2;

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded()); // parse submitted data from frontend

// initial page render
app.get('/', (req, res) => {
    res.render('index.ejs', { lockStatus: locked, stage: stage });
});

// collect submitted name and unlock keypad
app.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.name) {
        locked = false;
    }
    res.render('index.ejs', { lockStatus: locked, stage: stage });
});

app.listen(port, () => {
    console.log(`Lockbreaker listening on port ${port}`);
});