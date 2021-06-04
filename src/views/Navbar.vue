<template>
  <ul>
    <li>
      <img src="../assets/logo.jpg" alt="">
    </li>
    <li className="link">
      <!-- create will need login -->
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
      <router-link v-if="store.userAccount" to="/create">Create</router-link>
      <router-link to="/loginAndReview">{{store.userAccount ? 'Review' : 'Login'}}</router-link>
    </li>
    <li>
      <p>Copyright 2021 by Ikhz</p>
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup(){
    const store = useStore();
    
    return {
      store: store.state
    }
  }
};
</script>

<style scoped>
a,
span {
  padding: 6px 10px;
  background-color: #edeef7;
  border-bottom: 2px solid black;
}
a:hover,
span:hover {
  background-color: #8decfd;
  cursor: pointer;
  /* edeef7 */
  /* e4fbff */
}
ul {
  position: fixed;
  z-index: 1;
  display: grid;
  justify-content: center;
  grid-template-rows: 210px auto 50px;
  width: 200px;
  height: 100%;
  background-color: #d3e0ea;
  box-shadow: 1px 0px 10px 0px rgba(100, 100, 100, 0.5);
  /* padding-bottom: 10px; */
  padding: 0px 5px 0px;
}
ul img{
  border-radius: 50%;
  border: 4px solid white;
  width: 130px;
  box-shadow: 0px 0px 6px 3px rgb(0, 0, 0);
}
ul li:first-child {
  justify-self: center;
  align-self: center;
}
ul li *{
  display: block;
}
.link * {
  /* box-shadow: 0px 2px 2px 2px black; */
}
ul li:last-child{
  justify-self: center;
}
.link *:not(first-child){
  margin-top: 10px;
}
</style>
