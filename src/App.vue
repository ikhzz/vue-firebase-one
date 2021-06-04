<template>
  <Navbar/>
  <main>
    <router-view/>
  </main>
  
</template>

<script>
import Navbar from '@/views/Navbar.vue'
import {firebase} from './utils/firebaseConfig'
import { onBeforeMount } from '@vue/runtime-core'
import {useStore} from 'vuex'

export default {
  components :{
    Navbar,
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged(credential => {
        if(credential) 
          store.dispatch('setUser', credential.uid)
      })
    })
  },
}
</script>

<style>
/* Global style */
* {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: 'Andika New Basic', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
}
body{
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@font-face {
  font-family: 'Andika New Basic';
  src: url(./assets/AndikaNewBasic\ /AndikaNewBasic-Regular.ttf);
}
a,a:link, a:visited, a:hover, a:active {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
a:hover{
  color: black;
}
button{
  background-color: rgb(52, 126, 247);
  border: 1px solid rgb(27, 110, 243);
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 2px rgb(95, 154, 248);
  margin-right: 10px;
}
button:hover{
  background-color: rgb(95, 154, 248);
}
main {
  margin-left: 210px;
  background-color: #f6f5f5;
  padding-left: 5px;
}
main > * {
  min-height: 100vh;
  position: relative;
}
</style>
