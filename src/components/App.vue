<template>
  <div id="app">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
    :duration="250"
    >
    <router-view></router-view>
    </transition>
    <copyright v-if="!profile"></copyright>
    <van-tabbar v-model="active" v-if="isTabBar">
      <van-tabbar-item icon="wap-home" :to="{name: 'GroupList'}" >群组</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :to="{name: 'GroupFriends'}">群友</van-tabbar-item>
      <van-tabbar-item icon="notes-o" :to="{name: 'ActivityList'}">动态</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name: 'ProfileDetail', params: {id: 'me'}}" >我</van-tabbar-item>
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
      kehubuSocket: null,
    }
  },
  computed: mapState({
    profile: state => state.profile.profile,
    isTabBar: state => state.ui.isTabBar,
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
    vm.$store.dispatch("profile/getProfile").then( () => {
      vm.$router.push("/GroupList");
      vm.setupWebSock();
    });
  },
  methods: {
    checkSocket() {
      let vm = this;
      setTimeout(function() {
        if (vm.kehubuSocket.readyState === WebSocket.CLOSED) {
          vm.setupWebSock();
        }
      }, 5000);
    },
    setupWebSock() {
      let vm = this;
      let isSecure = location.protocol === "https:";
      let wsProtocol;
      if (isSecure) {
        wsProtocol = "wss:";
      } else {
        wsProtocol = "ws:";
      }
      const wsUrl = `${wsProtocol}//${window.location.host}/ws/kehubu/`;
      let kehubuSocket = new WebSocket(wsUrl);
      vm.kehubuSocket = kehubuSocket;
      kehubuSocket.onopen = function (e) {
        console.log("onopen", e);
        this.send(JSON.stringify({"msg": "hello"}));
      };
      kehubuSocket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        console.log('socket data', data);
        if (data.type == "kehubu.groupchat.add") {
          vm.$store.commit("chat/setNewGroupChat", data.groupchat);
        } else if (data.type == "kehubu.userchat.add") {
          vm.$store.commit("chat/setNewUserChat", data.userchat);
        }
      };
      kehubuSocket.onclose = function (e) {
        vm.checkSocket();
      };
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #f7f8fa;
}

.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
