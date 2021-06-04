<template>
  <div>
    <!-- error message -->
    <!-- <div class="message" v-if="store.errorMessage">
      <p>{{store.errorMessage}}</p>
    </div> -->
    <ErrorNotif />
    <!-- login form -->
    <ul v-if="!store.userAccount">
      <h2>Login</h2>
      <li>
        <input v-model="credential.email" type="text" placeholder="User Email">
      </li>
      <li>
        <input v-model="credential.password" type="password" placeholder="User Password">
      </li>
      <li><p>Don't have account ? <span >Register Here</span></p></li>
      <li>
        <button @click="login" >Login</button>
        <button @click="logout">Logout</button>
        <button @click="check">check</button>
      </li>
    </ul>
    <!-- logged in or question review -->
    <ul v-else>
      <h2>Logged in</h2>
      <button @click="logout">Logout</button>
    </ul>
    <!-- Later functionality for register -->
    <!-- <ul v-else>
      <h2>Register</h2>
      <li>
        <input type="text" placeholder="Your Username">
      </li>
      <li>
        <input type="text" placeholder="User Email">
      </li>
      <li>
        <input type="text" placeholder="User Password">
      </li>
      <li>
        <input type="text" placeholder="Confirm Password">
      </li>
      <li><p>Already have account ? <span @click="switchForm">Login Here</span></p></li>
      <li><button>Register</button></li>
    </ul> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ErrorNotif from '../components/ErrorNotif.vue'

export default {
  name: "LoginOrReview",
  components: {ErrorNotif},
  setup(){
    const store = useStore();
    const credential = ref({email: '', password: ''})

    const check = () => {
      console.log(store.state.userAccount);
    }
    const login = () => {
      store.dispatch('login', credential.value)
      credential.value.email = ''
      credential.value.password = ''
    }
    const logout = () => {
      store.dispatch('logout')
    }
    return {
      credential, logout, login, check, store: store.state
    }
  }
};
</script>

<style scoped>
div {
  display: grid;
  place-content: center;
  /* background-color: red; */
}
ul{
  display: grid;
  row-gap: 9px;
  justify-items: center;
  background-color: rgba(200, 200, 200, 0.5);
  padding: 20px 20px;
  border-radius: 10px;
}
input {
  border: 1px solid white;
  border-radius: 20px;
  height: 30px;
  min-width: 200px;
  box-shadow: 1;
  box-shadow: 1px 4px 2px 1px rgb(100, 100, 100);
  padding: 0px 12px;
}
input:focus {
  outline: none;
}
input::placeholder{
  text-align: center;
}
span{
  cursor: pointer;
}
span:hover{
  text-decoration: underline;
  color: blue;
}
.message {
  text-align: center;
  max-width: 300px;
  margin-bottom: 10px;
}
</style>
