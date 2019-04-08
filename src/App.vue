<template>
  <div id="app">
    <van-notice-bar mode="closeable" v-for="event in events">
      {{ event }}
    </van-notice-bar>
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
      active: 0,
      events: [],
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
      vm.$router.push("/GroupList");
      vm.setupWebSock();
    });
  },
  methods: {
    setupWebSock() {
      let vm = this;
      const wsUrl = "ws://" + window.location.host + "/ws/kehubu/";
      let groupSocket = new WebSocket(wsUrl);
      groupSocket.onopen = function (e) {
        console.log("onopen", e);
        groupSocket.send(JSON.stringify({"msg": "hello"}));
      };
      groupSocket.onmessage = function (e) {
        console.log('e', e);
        var data = JSON.parse(e.data);
        console.log('socket data', data);
        vm.events.push(data);
      };
      groupSocket.onclose = function (e) {
        console.error('group socket closed');
      };
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
