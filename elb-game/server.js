import express from 'express';
import pg from 'pg';
import 'dotenv/config';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = 5050;
const lockDelay = (60 * 1000); // 1 minute from current time
// const lockDelay = (12*60*60*1000); // 12 hrs from current time

// setup database and error handling
const db = new pg.Pool();
db.on('error', (err) => {
    console.error('An idle client has experienced an error!', err.stack);
})

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(fileURLToPath(dirname(import.meta.url)),'dist')));
// // store vue app (after build) in const
// const serveVueApp = (req, res) => {
//     return res.sendFile('./index.html');
// }

// app.get('/', serveVueApp);

app.post('/gethistory', async (req, res) => {
    let playerId = req.body.userId;
    let history = [];
    try {
        const result = await db.query('SELECT guess,result FROM guesses WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1;', [ playerId ]);
        history = result.rows;
    }
    catch(error) {
        console.log(`Error: ${error.message}`);
    }

    res.json(JSON.stringify(history));
});

app.post('/checkuser', async (req, res) => {
    let player = req.body;
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
            console.log(`Error: ${error.message}`);
        }
    }
    delete player.code;
    res.json(player);
})

app.post('/validate', async (req, res) => {
    let player = { id: req.body.userId, guesscount: req.body.guesscount, guess: req.body.guess };
    let validation = [];
    // update timerend
    player.timerend = Date.now() + lockDelay;
    db.query('UPDATE names SET timerend = $1 WHERE id = $2', [player.timerend, player.id]);
    // fetch secret code
    const result = await db.query('SELECT code FROM names WHERE id = $1', [player.id]);
    player.code = result.rows[0].code;

    // convert code number to string, then split strings to arrays for comparison
    const codeString = player.code.toString();
    let outputArray = player.guess.split('');
    let codeArray = codeString.split('');

    // if output and code match, return validation array filled with 'match'
    if (player.guess === codeString) {
        validation = Array(8).fill('match');
        updateGuessDB(validation, player);
        res.json({ results: validation, timerend: player.timerend });
        return;
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

    updateGuessDB(validation, player);

    res.json({ results: validation, timerend: player.timerend });
})

// function to add validation, guess count to database
function updateGuessDB(guessArray, player) {
    db.query('INSERT INTO guesses (user_id, timestamp, guess, result) VALUES ($1, $2, $3, $4);', [player.id, Date.now(), player.guess, guessArray.join(';')]);
    db.query('UPDATE names SET guesscount = $1 WHERE id = $2', [player.guesscount, player.id]);
}

// app.get('/*', serveVueApp);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})