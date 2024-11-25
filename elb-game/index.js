import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const app = express();
const port = 7001;

const db = new pg.Pool();
const lockDelay = (60 * 1000); // 1 minute from current time
// const lockDelay = (12*60*60*1000); // 12 hrs from current time

let player = {};
let output = '';
let locked = true;
let flashOutput = false;
let flashButtons = false;
let resultColors = [];
let history = [];

app.use('/static', express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); // parse submitted data from frontend

// initial page render
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT guess,result FROM guesses WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1;', [ player.id ]);
        console.log(result.rows);
        if (result.rowCount === 0) {
            history = [{ guess: 'No previous attempts', result: '' }];
        } else {
            history = result.rows;
        }
    }
    catch(error) {
        console.log(error);
    }
    res.render('index.ejs', { locked: locked, name: player.name, output: output, timer: player.timerend, flashOutput: flashOutput, flashButtons: flashButtons, resultColors: resultColors, history: history });
});

// collect submitted name and unlock keypad
app.post('/', async (req, res) => {
    player = {
        name: '',
        guesscount: 0,
        code: '',
        timerend: -1
    };
    player.name = req.body.name;
    flashButtons = false;

    if (player.name) {
        // check db for name
        try {
            const nameCheck = await db.query('SELECT * FROM names WHERE name = $1;', [player.name]);
            if (nameCheck.rowCount === 1) {
                player = nameCheck.rows[0];
                player.guesscount++;
            } else {
                // const code = Math.random().toString().slice(2,10);
                const code = 12345678;
                const newName = await db.query('INSERT INTO names (name, guesscount, code, timerend) VALUES ($1, 1, $2, $3) RETURNING *;', [player.name, code, player.timerend]);
                player = newName.rows[0];
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    if ((player.timerend - Date.now()) < 0) {
        // if timer reached zero, reset for new guess
        output = '';
        resultColors = [];
        locked = false;
    } else {
        // display error, then previous guess and result code
        const prevGuess = await db.query('SELECT guess,result FROM guesses WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1;', [ player.id ]);
        output = prevGuess.rows[0].guess.toString();
        resultColors = prevGuess.rows[0].result.split(';');
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
            // flash keypad red if too many numbers
            flashOutput = true;
        }
    }
    res.redirect('/');
});

app.post('/reset', async (req, res) => {
    // clear player from database
    await db.query('DELETE FROM guesses * WHERE user_id = $1;', [player.id]);
    await db.query('DELETE FROM names * WHERE id = $1;', [player.id]);

    // clear variables and redirect to root
    player = {
        name: '',
        guesscount: 0,
        code: '',
        timerend: -1
    };
    output = '';
    locked = true;
    flashButtons = false;
    resultColors = [];

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`"Electronic Lock Breaker" listening on port ${port}`);
});

// function to validate input
function validate() {
    let validation = [];
    player.timerend = Date.now() + lockDelay;
    db.query('UPDATE names SET timerend = $1 WHERE id = $2', [player.timerend, player.id]);

    // convert code number to string, then split strings to arrays for comparison
    const codeString = player.code.toString();
    let outputArray = output.split('');
    let codeArray = codeString.split('');

    // if output and code match, return validation array filled with 'match'
    if (output === codeString) {
        validation = Array(8).fill('match');
        updateGuessDB(validation);
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
    outputNoMatch.forEach((num) => {
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

    updateGuessDB(validation);

    return validation;
}

// function to add validation, guess count to database
function updateGuessDB(guessArray) {
    db.query('INSERT INTO guesses (user_id, timestamp, guess, result) VALUES ($1, $2, $3, $4);', [player.id, Date.now(), output, guessArray.join(';')]);
    db.query('UPDATE names SET guesscount = $1 WHERE id = $2', [player.guesscount, player.id]);
}