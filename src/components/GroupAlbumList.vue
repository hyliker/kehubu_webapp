<template>
  <div>
     <van-nav-bar
  title="相册"
  left-text="返回"
  left-arrow
  @click-left="gotoGroupDetail"
  />

  <div class="album" v-for="album in albums">
    <h1>{{ album.title }}</h1>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in album.groupalbumimage_set" :key="index">
      <img v-lazy="image.image" class="image" />
    </van-swipe-item>
  </van-swipe>
  </div>


</div>
</template>

<style scoped>
.album {
  padding: 10px;
}
.image {
  width: 100%;
}

</style>

<script>
export default {
  props: ['groupId'],
  data () {
    return {
      albums: []
    }
  },
  methods: {
    gotoGroupDetail() {
      this.$router.push({name: "GroupDetail", params: {id: this.groupId}});
    }
  },
  created () {
    let vm = this;
    let params = {group: vm.groupId};
    console.log("params", params);
    vm.$api.kehubu.getGroupAlbumList({params:params}).then( res => {
      vm.albums = res.data.results;
    });
  }
}
</script>