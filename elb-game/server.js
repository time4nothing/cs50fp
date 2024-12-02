import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5050;

let secretCode = ''; // code for player to guess, set below as random string

// setup database and error handling
const db = new pg.Pool();
db.on('error', (err) => {
    console.error('An idle client has experienced an error!', err.stack)
})

app.use(express.static(path.join(fileURLToPath(dirname(import.meta.url)),'dist')));
app.use(express.json());

// store vue app (after build) in const
const serveVueApp = (req, res) => {
    return res.sendFile(path.join(fileURLToPath(dirname(import.meta.url)), 'dist', 'index.html'))
}

app.get('/', serveVueApp);

app.get('/gethistory', async () => {
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
        console.log(`Error: ${error.message}`);
    }

    res.send(history);
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
    secretCode = player.code;
    delete player.code;
    res.json(player);
})

app.get('/*', serveVueApp);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})