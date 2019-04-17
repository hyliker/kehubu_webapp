<template>
  <div>
     <van-nav-bar
  :title="album.title"
  left-text="返回"
  left-arrow
  right-text="编辑"
  @click-left="$router.go(-1)"
  @click-right="gotoGroupAlbumEdit"
  />

  <van-cell>
  <div class="album">
    <div class="images">
      <div class="image" v-for="(image, index) in album.groupalbumimage_set">
        <img v-lazy="image.thumb" @click="viewImage(index)" />
      </div>
    </div>
    <p class="description van-hairline--top">{{ album.description }}</p>
    <div class="meta clearfix">
    <span class="created">{{ album.created | moment("from") }}</span>
    </div>
  </div>
  </van-cell>

  </div>
</template>


<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.description {
  padding-top: 10px;
}
.meta {
  font-size: 1.3em;
  padding-bottom: 10px;
}
.created {
  float: right;
  color: #aaa;
  margin-right: 10px;
}
.album {
  width: 100%;
  padding: 10px;
  margin-bottom: 50px;
}
.image {
  width: 100%;
}
.image img {
  width: 100%;
}
</style>

<script>
import { ImagePreview } from 'vant';
export default {
  props: ['id', 'album'],
  data () {
    return {
    }
  },
  created () {
    let vm = this;
    if (vm.album === undefined) {
      vm.$api.kehubu.getGroupAlbum(vm.id).then( res => {
        vm.album = res.data;
      });
    }
  },
  methods: {
    gotoGroupAlbumEdit() {
      this.$router.push({name: "GroupAlbumEdit", params: {id: this.album.id}});
    },
    viewImage(index) {
      let vm = this;
      let images = vm.$_.pluck(vm.album.groupalbumimage_set, "image");
      ImagePreview({
        images: images,
        startPosition: index,
      });
    }
  }
}
</script>

