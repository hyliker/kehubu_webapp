<template>
<div class="root">
  <div class="topic">
    <span class="title">{{ topic.title }}</span>
    <div class="meta">
      <avatar :profile="topic.creator.kehubu_profile" size="19px" class="avatar" />
      <span>{{ topic.creator.username }}</span>
      <span>{{ topic.modified | moment("from") }}</span>
      <span>跟贴: {{ topic.post_count }}</span>
    </div>
    <p class="content" v-html="topic.content"></p>
  </div>
</div>
</template>

<style scoped>
.title {
  color: #000;
  font-size: 1.1em;
}
.topic {
  margin: 0px;
  padding: 5px 10px;
  border-radius: 5px;
}
.avatar {
  display: inline-block;
  margin: 0px;
}
.meta {
  padding: 5px 0;
  color: #555;
  border-bottom: 1px solid #ddd;
}
.meta span {
  margin-left: 10px;
  margin-top: -10px;
  display: inline-block;
  vertical-align: middle;
}
.content {
  margin: 5px 0;
  padding: 5px 0;
  text-align: left;
}

</style>

<script>
import Avatar from '@/components/Avatar.vue';
export default {
  props: ['topic'],
  components: {
    Avatar,
  }
}
</script>