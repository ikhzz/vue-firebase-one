<template>
  <div v-if="store.errorMessage">
    <p>{{store.errorMessage}}</p>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ErrorNotif',
  setup(){
    const store = useStore();

    return {store: store.state}
  }
}
</script>

<style scoped>
div {
  position: absolute;
  align-self: flex-start;
  justify-self: center;
  animation: slideError 1s forwards ;
  max-width: 400px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid black;
  padding: 4px 8px;
}
@keyframes slideError {
  0% { transform: translateY(0%); }
  100% {transform: translateY(200%);}
}
</style>