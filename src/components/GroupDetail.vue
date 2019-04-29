<template>
<div v-if="group">
  <vue-headful :title="title" />
  <div class="cover-wrap">
    <img class="cover" v-lazy="group.cover" v-if="group.cover" />
    <div class="cover-empty" v-else />
  </div>
    <van-nav-bar
  left-arrow
  :title="title"
  right-text="设置"
  @click-left="$router.go(-1)"
  @click-right="gotoGroupDetailSettings"
  class="nav-bar"
  :border="false"
  />

  <van-notice-bar :text="group.notice" left-icon="volume-o" v-if="group.notice_enabled" />

  <div class="submenu clearfix">
    <van-col span="6">
      <router-link :to="{name: 'GroupMemberList', params: {groupId: id}}">
        <van-icon name="friends-o" size="40px" />
        <br />
        <span class="label">成员 ({{group.member_count}})</span>
        </router-link>
    </van-col>
    <van-col span="6">
      <router-link :to="{name: 'GroupAlbumList', params: {groupId: id}}">
        <van-icon name="photo-o" size="40px" />
        <br />
        <span>相册 ({{ group.album_count }})</span>
      </router-link>
    </van-col>
    <van-col span="6">
      <router-link :to="{name: 'GroupChat', params: {groupId: id}}">
        <van-icon name="chat-o" size="40px" />
        <br />
        <span>群聊</span>
      </router-link>
    </van-col>
    <van-col span="6">
      <router-link :to="{name: 'GroupForum', params: {groupId: id}}">
        <van-icon name="newspaper-o" size="40px" />
        <br />
        <span v-if="group.forum_stats">论坛 ({{ group.forum_stats.post_count }})</span>
      </router-link>
    </van-col>
    <!--
    <van-col span="6">
        <van-icon name="add-o" size="40px" />
        <br />
        <span>其它</span>
    </van-col>
    -->
  </div>

  <div class="plugins">
    <group-photo-plugin title="相册" :groupId="id" class="plugin"></group-photo-plugin>
    <group-forum-plugin title="论坛" :groupId="id" class="plugin"></group-forum-plugin>
  </div>
</div>
</template>

<style scoped>
.nav-bar {
  background-color: rgba(255, 255, 255, 0.6);
  color: #fff;
  width: 100%;
  position: absolute;
  top: 0px;
}
.cover {
  width: 100%;
}
.cover-empty {
  min-height: 200px;
  background-color: #ccc;
}
.cover-wrap {
  overflow: hidden;
  max-height: 500px;
}
.plugins {
  margin-bottom: 50px;
}
.plugin {
  margin: 10px;
}
.submenu {
  background-color: #fff;
  padding: 10px;
}
.submenu span {
  font-size: 13px;
}
.meta {
  color: #555;
  margin: 0px;
}
.plugs {
  text-align: left;
  clear: both;
  border-top: 2px solid #eee;
}

</style>


<script>
import GroupPhotoPlugin from '@/components/GroupPhotoPlugin.vue';
import GroupForumPlugin from '@/components/GroupForumPlugin.vue';
import { mapState } from 'vuex';
export default {
  props: ['id'],
  components: {
    GroupPhotoPlugin, GroupForumPlugin
  },
  data() {
    return {
    }
  },
  computed: {
    title () {
      return this.group && this.group.name;
    },
    ...mapState('group', {
      group: 'currentGroup',
      }
    )
  },
  created () {
    this.$store.commit("ui/hideTabBar");
    this.$store.dispatch("group/getGroup", this.id);
  },
  methods: {
    gotoGroupEdit() {
      this.$router.push({name: "GroupEdit", params: {id: this.id}});
    },
    gotoGroupDetailSettings() {
      this.$router.push({name: "GroupDetailSettings", params: {id: this.id}});
    },
  },
  
}
</script>
