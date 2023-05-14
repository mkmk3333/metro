<template>
  <div>
    <router-view name='Main'></router-view>
    <button @click='toTest'>Test</button>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name: 'App',
  setup(){
    const myrouter=useRouter()
    function toTest(){
      myrouter.push('/test')
    }
    return {
      toTest,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
