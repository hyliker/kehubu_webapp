<template>
  <div id="app">
    <router-view></router-view>
    <copyright v-if="!user"></copyright>
    <van-tabbar v-model="active" v-if="user">
      <van-tabbar-item icon="friends-o">群组</van-tabbar-item>
      <van-tabbar-item icon="search" dot>动态</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Copyright from '@/components/Copyright.vue'

export default {
  name: 'app',
  components: {
    Home, Copyright
  },
  data: function () {
    return {
      user: null,
      active: 1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
