<template>
  <el-container>
    <el-aside>
      <router-view name="Aside"></router-view>
    </el-aside>
    <el-main>
      <router-view name='Main'></router-view>
      
    </el-main>
    
    
  </el-container>
</template>

<script>


export default {
  name: 'App',
  setup(){
    
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
