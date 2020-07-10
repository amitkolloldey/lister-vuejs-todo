<template>
  <div id="app">
    <img alt="Task List logo" src="./assets/logo.png" class="logo">
    <ToDo></ToDo>
  </div>
</template>

<script>
import ToDo from './components/ToDo/ToDo'

export default {
  name: 'App',
  components: {
    ToDo
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  width: 650px;
  margin: 60px auto auto;
}
  .logo{
    width: 200px;
  }
</style>
