<template>
<div class="root">
  <div class="post">
    <div class="meta">
      <avatar :profile="post.creator.kehubu_profile" size="19px" class="avatar" />
      <span class="creator">{{ post.creator.username }}</span>
      <span class="modified">{{ post.modified | moment("from") }}</span>
    </div>
    <p class="content">{{ post.content }}</p>
  </div>
</div>
</template>

<style scoped>
.post {
  margin: 0px;
  background-color: rgb(247, 248, 250);
  padding: 10px;
  border-radius: 5px;
}
.avatar {
  float: left;
  margin: 0px;
}
.meta {
  padding: 5px 0;
}
.meta span {
  margin-left: 10px;
  margin-top: -5px;
  display: inline-block;
  vertical-align: middle;
}
.content {
  margin: 0px;
  padding: 0px;
}

</style>

<script>
import Avatar from '@/components/Avatar.vue';
export default {
  props: ['post'],
  components: {
    Avatar,
  }
}
</script>