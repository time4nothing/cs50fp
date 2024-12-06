// system imports
import { ref } from 'vue';
import { defineStore } from 'pinia'

// define store
export const useHistoryStore = defineStore('history', () => {
    // local variables
    const guessHistory = ref([]);

    // update guess history array
    async function updateHistory(userId) {
        try {
            const response = await fetch('http://localhost:5050/gethistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
            const result = await response.json();
            guessHistory.value = JSON.parse(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    return { guessHistory, updateHistory };
});