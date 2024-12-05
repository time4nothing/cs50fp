// system imports
import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

// store imports
import { useUserStore } from './user.js';
import { useKeypadStore } from './keypad.js';
import { useHistoryStore } from './history.js';

// define store
export const useGuessStore = defineStore('guesses', () => {
    // local variables
    const guess = ref('12345678');
    const resultArray = ref(['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no']);
    const guessLocked = ref(false);
    const guessError = ref(false);

    // store refs
    const { user, usertimerend } = storeToRefs(useUserStore());
    const { keypadError, keypadLocked } = storeToRefs(useKeypadStore());

    // store functions
    const { updateHistory } = useHistoryStore();

    // respond to key selections
    function updateGuess(event) {
        if (guess.value.length === 8 && event === 'enter') {
            keypadLocked.value = true;
            validateGuess(guess.value);
        } else if (event === 'backspace') {
            guess.value = guess.value.slice(0, -1);
        } else if (guess.value.length < 8 && event !== 'enter') {
            guess.value += event;
        } else {
            keypadError.value = true;
            setTimeout(() => {
                keypadError.value = false;
            }, 300)
        }
    }

    // validate guess, return result
    async function validateGuess(guess) {
        try {
            const response = await fetch('http://localhost:5050/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.value.id, guesscount: user.value.guesscount, guess: guess })
            })
            const fetchResult = await response.json();
            usertimerend.value = fetchResult.timerend;
            resultArray.value = fetchResult.results;
        }
        catch (error) {
            console.log(error);
        }
        updateHistory(user.value.id);
    }

    return { guess, resultArray, guessLocked, guessError, updateGuess };
});