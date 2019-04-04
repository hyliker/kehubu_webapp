<template>
  <div id="app">
    <router-view></router-view>
    <copyright v-if="!profile"></copyright>
    <van-tabbar v-model="active" v-if="profile">
      <van-tabbar-item icon="friends-o">群组</van-tabbar-item>
      <van-tabbar-item icon="search" dot>动态</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Copyright from '@/components/Copyright.vue'
import { mapState } from 'vuex'
import _ from 'underscore'


export default {
  name: 'app',
  components: {
    Copyright
  },
  data: function () {
    return {
      active: 1
    }
  },
  computed: mapState({
    profile: state => state.profile,
    })
  ,
  watch: {
    profile: function (val, oldVal) {
      if (val !== null) {
        this.$emit("ProfileReady", val);
      }
    }
  },
  created () {
    let vm = this;
    vm.$store.dispatch("getProfile").then( () => {
      vm.$router.push("GroupList");
    });
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
