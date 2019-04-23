<template>
<group-plugin :title="title" v-if="album">
  <template v-slot:content>
    <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in album.groupalbumimage_set" :key="index">
      <router-link :to="{name: 'GroupAlbumDetail', params: {id: album.id, album: album}}">
      <img v-lazy="image.image" class="image" />
      </router-link>
    </van-swipe-item>
  </van-swipe>
  </template>
</group-plugin>
</template>

<style scoped>
.image {
  width: 100%;
}
</style>


<script>
import GroupPlugin from '@/components/GroupPlugin.vue';
export default {
  name: "GroupPhotoPlugin",
  props: ['title', 'groupId'],
  components: {
    GroupPlugin 
  },
  data () {
    return {
      album: null,
    }
  },
  created () {
    let vm = this;
    let params = {group: vm.groupId, ordering: '-modified'};
    vm.$api.kehubu.getGroupAlbumList({params:params}).then( res => {
      if (res.data.count > 0) {
        vm.album = res.data.results[0];
      }
    });
  }
}
</script>