<template>
<div>
  <div class="meta clearfix">
  <span class="title">{{ album.title }}</span> <span class="created">{{ album.created | moment("from") }}</span>
  </div>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in album.groupalbumimage_set" :key="index">
      <img v-lazy="image.image" class="image" />
    </van-swipe-item>
  </van-swipe>
  <p>{{ album.description }}</p>
</div>
</template>

<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.meta {
  font-size: 1.3em;
  padding-bottom: 10px;
}
.title {
  float: left;
}
.created {
  float: right;
  color: #aaa;
}
.album {
  padding: 10px;
}
.image {
  width: 100%;
}

</style
</div>
</template>

<script>
export default {
  props: ['album'],
}
</script>

