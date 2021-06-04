<template>
  <div class="home">
    <h2>iQuestion</h2>
    <div class="list">
      <ul>
        <li>Open question</li>
      </ul>
      <ul>
        <li>2</li>
      </ul>
      <label> question key</label>
      <input>
      <button>find</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style scoped>
  .home{
    display: grid;
    place-content: center;
  }
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>