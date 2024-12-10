// system imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

// store imports
import { useHistoryStore } from './history';

// define store
export const useUserStore = defineStore('user', () => {
  // local variables
  const user = ref({});
  const usertimerend = ref('');

  // store functions
  const { updateHistory } = useHistoryStore();

  // check if user in database or add
  async function updateUser(userInfo) {
    try {
      const response = await fetch('http://localhost:5050/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      user.value = await response.json();
      usertimerend.value = +user.value.timerend;
    } catch (error) {
      console.log(error);
    }

    updateHistory(user.value.id);
  }

  async function clearUserFromDB(playerId) {
    try {
      await fetch('http://localhost:5050/clearfromdatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerId: playerId })
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { user, usertimerend, updateUser, clearUserFromDB };
});
