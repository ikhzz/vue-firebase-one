<template>
  <div>
    <ErrorNotif />
    <ul>
      <h3>Create Question</h3>
      <li>
        <input name="title" v-model="question.title" type="text" placeholder="Title" required>
      </li>
      <li>
        <textarea v-model="question.question" type="text" placeholder="Question"></textarea>
      </li>
      <li>
        <label for="limit">Limit Answer ?</label>
        <input v-model="question.limit" name="limit" type="checkbox" />
      </li>
      <li>
        <input v-model="question.answerLimit" type="number" :disabled="!question.limit" />
      </li>
      <li>
        <label for="expire">Limit Time ?</label>
        <input v-model="question.expire" name="expire" type="checkbox" />
      </li>
      <li>
        <input v-model="question.timeLimit" type="number" placeholder="Time Limit" :disabled="!question.expire" :required="question.expire" />
        <label for="timeOption" class="timeOption">Choose a Time limit :</label>
        <select class="options" v-model="question.timeOption" name="timeOption" :disabled="!question.expire" :required="question.expire">
          <option disabled value=0 >Pick Time</option>
          <option value=60 >Hour</option>
          <option value=1440 >Day</option>
          <option value=10080 >Week</option>
        </select>
      </li>
      <li>
        <label for="expire">Public ?</label>
      </li>
      <li>
        <input v-model="question.public" name="expire" type="radio" value=true />
        <label for="public">Yes</label>
        <input v-model="question.public" name="expire" type="radio" value=false />
        <label for="private">No</label>
      </li>
      <li>
        <button @click="submit">Submit Question</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import ErrorNotif from '../components/ErrorNotif.vue';
import { useStore } from 'vuex';

export default {
  components: { ErrorNotif },
  name: "create",
  setup(){
    const store = useStore()
    const question = ref({
      title: '',
      question: '',
      answerLimit: 0,
      timeLimit: 0,
      timeOption: 0,
      limit: false,
      expire: false,
      public: true,
    })

    const submit = () => {
      const limit = new Date(),
        val = question.value,
        errMsg = []
      
      if(val.title.length < 1) errMsg.push('Title required')
      if(val.question.length < 1) errMsg.push('Question required')
      if(val.limit && val.answerLimit == 0) errMsg.push('If limit of answer is set, value of limit required')
      if(val.expire && (val.timeLimit <= 0 || val.timeOption <= 0) ){
        errMsg.push('If time limit is set, value of time limit required and more than 0')
      } else {
        limit.setTime(limit.getTime() + (val.timeLimit * val.timeOption * 60 * 1000))
      }
      
      if(errMsg.length > 0){
        store.dispatch('setErrorMessage', errMsg.join(', '))
      } else {
        if(val.expire) {
          val.times = limit.toString()
        }
        // console.log(val);
        store.dispatch('createQuestion', val)
      }
    }
    return {
      submit, question
    }
  }
};
</script>

<style scoped>
div {
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 10px 10px;
  /* position: relative; */
}

ul {
  display: grid;
  row-gap: 20px;
  align-content: flex-start;
  background-color: rgba(200, 200, 200, 0.5);
  padding: 20px 20px;
  border-radius: 10px;
  width: 80%;
}

ul h3 {
  justify-self: center;
}
textarea {
  width: 95%;
  justify-self: center;
  min-height: 100px;
  resize: none;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1;
  box-shadow: 1px 4px 2px 1px rgb(100, 100, 100);
  padding: 0px 10px;
}
label {
  margin-right: 5px;
}
.timeOption {
  margin-left: 5px;
}
li:last-child {
  justify-self: center;
}

input[type='text'] {
  width: 75%;
  justify-self: center;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1;
  box-shadow: 1px 4px 2px 1px rgb(100, 100, 100);
  padding: 0px 12px;
  height: 30px;
}
input:focus, textarea:focus {
  outline: none;
}
input::placeholder, textarea::placeholder{
  text-align: center;
}
input[type=number] {
  max-width: 50px;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1;
  box-shadow: 1px 4px 2px 1px rgb(100, 100, 100);
  padding: 0px 10px;
}
input[type=radio]{
  display: inline-block;
  margin-right: 4px;
}
</style>
