<template>
<div>
  <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="goBack"
  fixed
  />

  <div class="content">
  <van-loading v-if="loading" class="loading" />
  <div class="chats" ref="chats">
    <div class="chat van-hairline--bottom" v-for="chat in chatList" :key="chat.id">
      <router-link :to="{name: 'ProfileDetail', params: {id: chat.user.kehubu_profile.id }}">
        <avatar :profile="chat.user.kehubu_profile" class="avatar" size="40px" />
      </router-link>
      <p class="name">{{ chat.user.username }} <span class="created">{{ chat.created | moment("MM/DD/YY h:mm A") }}</span></p>
      <p class="message">{{ chat.message }}</p>
    </div>
  </div>
    <van-cell-group class="chatform">
      <van-field v-model="message" type="textarea" autosize placeholder="请输入聊天内容">
        <van-button slot="button" size="small" :disabled="sending || !message" type="primary" @click="sendMessage">{{ sending ? "发送中": "发送" }}</van-button>
      </van-field>
    </van-cell-group>
  </div>
  </div>
</div>
</template>


<style scoped>
.content {
  margin-top: 40px;
}
.content .loading {
  margin: 0 auto;
}
.chats {
  margin-bottom: 70px;
  text-align: left;
}
.chatform {
  width: 100%;
  height: 70px;
  position: fixed;
  margin-left: -10px;
  bottom: 0;
}
.chat {
  padding: 10px;
}
.avatar {
  float: left;
  padding-right: 10px;
}
.created {
  font-size: 12px;
  color: #aaa;
  float: right;
}
.name {
  color: #777;
  font-size: 1em;
  margin-top: 0px;
}
p.message {
  margin-top: -5px;
  border-radius: 5px;
  margin-left: 50px;
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
}
</style>


<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';
import Avatar from "@/components/Avatar.vue";
export default {
  props: ['groupId'],
  components: {
    Avatar,
  },
  data() {
    return {
      loading: true,
      sending: false,
      message: '',
      chatList: [],
    }
  },
  computed: {
    title() {
      return `${this.group.name} (${this.group.member_count})`; 
    }, ...mapState({
      group: state => state.currentGroup,
      newGroupChat: state => state.newGroupChat,
    })
  },
  watch: {
    newGroupChat(newVal, oldVal) {
      this.pushGroupChat(newVal);
    }
  },
  created() {
    let vm = this;
    vm.getGroupChatList();
  },
  methods: {
    pushGroupChat(chat) {
      var found = this.chatList.find(function (item) {
        return (item.id === chat.id)
      });
      if (!found) {
        this.chatList.push(chat);
        this.chatList = this.$_.sortBy(this.chatList, function (item) {
          return item.id;
        });
        this.scroll();
      }
    },
    scroll() {
      let vm = this;
      vm.$nextTick(function () {
        let height = vm.$refs.chats.scrollHeight + 70;
        window.scrollTo(0, height);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getGroupChatList() {
      let vm = this;
      let params = {group: vm.groupId, ordering:'-created', limit: 50};
      vm.$api.kehubu.getGroupChatList({params:params}).then( res => {
        vm.chatList = res.data.results.reverse();
        vm.loading = false;
        console.log("res", res.data);
      });
    },
    sendMessage() {
      let vm = this;
      vm.sending = true;
      let data = {message: vm.message, group: vm.groupId};
      vm.$api.kehubu.createGroupChat(data).then( res => {
        vm.pushGroupChat(res.data);
        vm.message = "";
      }).finally(err => {
        vm.sending = false;
      });
    }
  }
}
</script>

