<template>
<group-plugin :title="title" v-if="topicList">
  <template v-slot:content>
    <div class="topic clearfix" v-for="item in topicList" :key="item.id">
      <avatar :profile="item.creator.kehubu_profile" size="50px" class="avatar" />
      <div class="meta">
        <p class="title">
        <router-link :to="{name: 'GroupForumTopic', params: {id: item.id}}">
          {{ item.title }}
        </router-link>
          </p>
        <p class="submeta">
          <span class="creator">作者: {{ item.creator.username }}</span>
          <span class="post_count">跟贴: {{ item.post_count }}</span>
          <span class="modified">创建于: {{ item.modified | moment("from") }}</span>
        </p>
      </div>
    </div>
  </template>
</group-plugin>
</template>

<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.topic {
  padding-top: 10px;
  text-align: left;
  clear: both;
  border-bottom: 1px solid #eee;
}
.topic .avatar {
  float: left;
  margin-right: 10px;
}
.topic .meta {
  float: left;
}
.topic .submeta {
  color: #777;
  font-size: 13px;
}
.topic span {
  margin-right: 10px;
}
.topic .title {
  margin: 0px;
  margin-bottom: 5px;
  font-size: 15px;
  width: 100%;
}
</style>


<script>
import GroupPlugin from '@/components/GroupPlugin.vue';
import Avatar from '@/components/Avatar.vue';
export default {
  name: "GroupForumPlugin",
  props: ['title', 'groupId'],
  components: {
    GroupPlugin, Avatar,
  },
  data () {
    return {
      topicList: [],
    }
  },
  created () {
    let vm = this;
    let params = {limit: 5, ordering: '-created', category__group: vm.groupId};
    vm.$api.forum.getTopicList({params:params}).then( res => {
      vm.topicList = res.data.results;
    });
  }
}
</script>