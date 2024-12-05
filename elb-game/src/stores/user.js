import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // local variables
  const user = ref({
    id: '',
    name: 'Jerry',
    guesscount: 0,
    timerend: -1
  });
  const usertimerend = ref(user.value.timerend);
  // const { updateHistory } = useGuessStore();

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
    } catch (error) {
      console.log(error);
    }

    //updateHistory(user.value.id);
  }

  return { user, usertimerend, updateUser };
});
