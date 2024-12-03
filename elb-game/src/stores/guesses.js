import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useKeypadStore } from './keypad.js';
import { useUserStore } from './user.js';

export const useGuessStore = defineStore('guesses', () => {
    const guess = ref('12345678');
    const resultArray = ref(['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no']);
    const guessHistory = ref([]);
    const guessLocked = ref(false);
    const { keypadLocked } = storeToRefs(useKeypadStore());
    const { user } = storeToRefs(useUserStore());

    function updateGuess(event) {
        if (guess.value.length === 8 && event === 'enter') {
            keypadLocked.value = true;
            validateGuess(guess.value);
        } else if (event === 'backspace') {
            guess.value = guess.value.slice(0, -1);
        } else if (guess.value.length < 8 && event !== 'enter') {
            guess.value += event;
        } else {
            guessLocked.value = true;
            setTimeout(() => {
                guessLocked.value = false;
            }, 300)
        }
    }

    async function validateGuess(guess) {
        // validate guess, return result
        try {
            const response = await fetch('http://localhost:5050/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.value.id, guesscount: user.value.guesscount, guess: guess })
            })
            const fetchResult = await response.json();
            resultArray.value = fetchResult;
        }
        catch (error) {
            console.log(error);
        }

        // update guessHistory
        try {
            const response = await fetch('http://localhost:5050/gethistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.value.id })
            })
            const result = await response.json();
            guessHistory.value = JSON.parse(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    return { guess, resultArray, guessHistory, guessLocked, updateGuess };
});