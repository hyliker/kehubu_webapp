<template> 
   <div>
  <van-nav-bar
  :title="title"
  right-text="成员"
  left-arrow
  @click-left="$router.go(-1)"
  fixed
  >
  <template v-slot:right>
    <router-link :to="{name: 'ProfileDetail', params: {id: userId}}">
      <van-icon name="user-circle-o" size="25px" />
    </router-link>
  </template>
  </van-nav-bar>

  <div class="content">
  <van-loading v-if="loading" class="loading" />
  <div class="chats" ref="chats">
    <div class="chat van-hairline--bottom" v-for="chat in chatList" :key="chat.id">
      <router-link :to="{name: 'ProfileDetail', params: {id: chat.sender.kehubu_profile.id }}">
        <avatar :profile="chat.sender.kehubu_profile" class="avatar" size="40px" />
      </router-link>
      <div class="meta clearfix">
        <span class="name">{{ chat.sender.username }} </span>
        <span class="created">{{ chat.created | moment("MM/DD/YY h:mm A") }}</span>
      </div>
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
.clearfix:after{
  clear: both;
  content: "";
  display: table;
}
.content {
  margin-top: 40px;
  margin-left: 0px;
}
.clearfix:after {
  clear: both;
  content: " ";
  display: table;
}
.content .loading {
  margin: 0 auto;
}
.chats {
  margin-bottom: 70px;
  text-align: left;
  margin-top: 5px;
}
.chatform {
  width: 100%;
  height: 70px;
  position: fixed;
  margin-left: -10px;
  bottom: 0;
}
.chat {
  padding: 5px 0px;
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
  margin-left: 5px;
}
.chat .message {
  margin-top: -20px;
  border-radius: 5px;
  margin-left: 50px;
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
}
</style>


<script>
import { mapState } from 'vuex'
import Avatar from "@/components/Avatar.vue";
export default {
  props: ['userId'],
  components: {
    Avatar,
  },
  data() {
    return {
      loading: true,
      sending: false,
      message: '',
      chatList: [],
      sender: null,
      receiver: null,
    }
  },
  computed: {
    title() {
      if (this.receiver) {
        return this.receiver.user.username;
      } else {
        return "";
      }
    }, ...mapState({
      newUserChat: state => state.newUserChat,
    })
  },
  watch: {
    newUserChat(newVal, oldVal) {
      console.log('newUserchat', newVal, oldVal);
      this.pushUserChat(newVal);
    }
  },
  created() {
    let vm = this;
    vm.$store.commit("hideTabBar");
    vm.$api.kehubu.getProfile(vm.userId).then( res => {
      vm.receiver = res.data;
    });
    vm.getUserChatList();
  },
  methods: {
    pushUserChat(chat) {
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
    getUserChatList() {
      let vm = this;
      let params = {chat_user: vm.userId, ordering:'-created', limit: 50};
      vm.$api.kehubu.getUserChatList({params:params}).then( res => {
        vm.chatList = res.data.results.reverse();
        vm.loading = false;
        console.log("res", res.data);
      });
    },
    sendMessage() {
      let vm = this;
      vm.sending = true;
      let data = {message: vm.message, receiver: vm.userId};
      vm.$api.kehubu.createUserChat(data).then( res => {
        vm.pushUserChat(res.data);
        vm.message = "";
      }).finally(err => {
        vm.sending = false;
      });
    }
  }
}
</script>