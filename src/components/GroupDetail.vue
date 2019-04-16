<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  right-text="设置"
  @click-left="$router.go(-1)"
  @click-right="gotoGroupDetailSettings"
  />

  <van-notice-bar :text="item.notice" left-icon="volume-o" v-if="item.notice_enabled" />

  <div class="submenu clearfix">
    <van-col span="6">
      <router-link :to="{name: 'GroupMemberList', params: {groupId: id}}">
        <van-icon name="friends-o" size="40px" />
        <br />
        <span class="label">成员 ({{item.member_count}})</span>
        </router-link>
    </van-col>
    <van-col span="6">
      <router-link :to="{name: 'GroupAlbumList', params: {groupId: id}}">
        <van-icon name="photo-o" size="40px" />
        <br />
        <span>相册 ({{ item.album_count }})</span>
      </router-link>
    </van-col>
    <!-- 
    <van-col span="6">
        <van-icon name="records" size="40px" />
        <br />
        <span>日志 (8)</span>
    </van-col>
    --->
    <van-col span="6">
      <router-link :to="{name: 'GroupChat', params: {groupId: id}}">
        <van-icon name="chat-o" size="40px" />
        <br />
        <span>群聊</span>
      </router-link>
    </van-col>
    <van-col span="6">
        <van-icon name="add-o" size="40px" />
        <br />
        <span>其它</span>
    </van-col>
  </div>

  <div class="plugins">
    <group-photo-plugin title="相册" :groupId="id"></group-photo-plugin>
  </div>
</div>
</template>

<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.plugins {
  margin-bottom: 50px;
}
.members {
  clear: both;
}
.submenu {
  background-color: #fff;
  padding: 10px;
}
.submenu span {
  font-size: 13px;
}

.inviter {
  font-weight: bold;
}
.head_image {
  width: 50px;
  height: 50px;
  float: left;
  padding-right: 10px;
}
.name {
  font-size: 1.5em;
  padding: 0px;
  margin: 0px;
}
.meta {
  color: #555;
  margin: 0px;
}
.member {
  text-align: left;
}
.plugs {
  text-align: left;
  clear: both;
  border-top: 2px solid #eee;
}

</style>


<script>
import GroupPhotoPlugin from '@/components/GroupPhotoPlugin.vue';
export default {
  props: ['id'],
  components: {
    GroupPhotoPlugin
  },
  data() {
    return {
      item: {},
      members: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
    }
  },
  computed: {
    title () {
      return this.item.name + `(${this.item.member_count})`;
    }
  },
  created () {
    this.$store.commit("hideTabBar");
    this.loadGroup();
  },
  methods: {
    gotoGroupEdit() {
      this.$router.push({name: "GroupEdit", params: {id: this.$route.params.id}});
    },
    gotoGroupDetailSettings() {
      this.$router.push({name: "GroupDetailSettings", params: {id: this.$route.params.id}});
    },
    loadGroup() {
      let vm = this;
      vm.$api.kehubu.getGroup(vm.$route.params.id).then( res => {
        vm.item = res.data;
        vm.$store.commit("updateCurrentGroup", res.data);
      });
    },
  },
  
}
</script>
