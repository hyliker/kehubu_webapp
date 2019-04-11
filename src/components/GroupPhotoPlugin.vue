<template>
<group-plugin :title="title">
  <template v-slot:content>
    <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" height="200px" />
    </van-swipe-item>
  </van-swipe>
  </template>
</group-plugin>
</template>

<script>
import GroupPlugin from '@/components/GroupPlugin.vue';
export default {
  name: "GroupPhotoPlugin",
  props: ['title'],
  components: {
    GroupPlugin 
  },
  data () {
    return {
      images: [
        'https://pic.36krcnd.com/201904/11063956/gy7hr25ld6sx91k7.jpeg!1200',
        'https://pic.36krcnd.com/201904/11063956/gy7hr25ld6sx91k7.jpeg!1200',
      ]
    }
  }
}
</script>