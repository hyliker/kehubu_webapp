<template>
  <div>
     <van-nav-bar
  title="相册"
  left-text="返回"
  left-arrow
  right-text="保存"
  @click-left="gotoGroupAlbum"
  @click-right="saveGroupAlbum"
  />

<van-cell-group>
  <van-field label="标题" required v-model="title" placeholder="请输入标题" />
  <van-field label="描述" type="textarea" rows="3" v-model="description" placeholder="请输入描述" />
  <van-switch-cell v-model="is_visible" title="是否显示" />
</van-cell-group>

<van-cell-group>
  <draggable v-model="images" group="image" @start="drag=true" @end="drag=false">
  <div v-for="image, index in images" :key="index">
    <div class="imagewrap">
    <img :src="image.content" />
    <van-button type="default" size="small" class="deleteButton" @click="deleteImage(index)">删除</van-button>
    </div>
  </div>
  </draggable>
  <van-uploader :after-read="onRead" class="uploader">
    <van-icon name="plus" size="30px" class="plus" />
  </van-uploader>
</van-cell-group>

<van-dialog
  v-model="willDeleteImage"
  title="删除相片"
  show-cancel-button
  @confirm="onConfirmDeleteImage"
>
  <img :src="willDeleteImage.content" width="100%" v-if="willDeleteImage">
</van-dialog>

<br />
<van-button v-if="isUpdating" type="danger" plain size="large" @click="destroyGroupAlbum">删除</van-button>


  </div>
</template>

<style scoped>
.plus {
  padding: 25px;
  background-color: #eee;
}
.deleteButton {
  margin-bottom: 10px;
}
.imagewrap img {
  display: block;
}
.uploader {
  height: 80px;
  width: 80px;
  float: left;
  margin: 10px;
}
.images {
  background-color: #fff;
  padding: 10px;
  float: left;
}
.imagewrap {
  float: left;
  background-color: #fff;
  border: 1px dashed #ddd;
}
.imagewrap img {
  width: 80px;
  height: 80px;
  margin: 10px;
}

</style>

<script>
import draggable from 'vuedraggable';
import { Dialog } from 'vant';
import {mapState} from 'vuex';
export default {
  props: ['id'],
  components: {
    draggable,
  },
  data () {
    return {
      title: '',
      description: '',
      images: [],
      is_visible: true,
      drag: false,
      willDeleteImage: null,
      willDeleteImageIndex: null,
    }
  },
  computed: {
    isUpdating () {
      return this.id !== undefined;
    },
    ...mapState('group', ['currentGroup']),
  },
  created () {
    let vm = this;
    if (vm.isUpdating) {
      vm.$api.kehubu.getGroupAlbum(vm.id).then( res => {
        vm.title = res.data.title;
        vm.description = res.data.description;
        vm.is_visible = res.data.is_visible;
        res.data.groupalbumimage_set.forEach(function (item) {
          vm.images.push({id: item.id, content: item.image});
        });
      });
    }
  },
  methods: {
    gotoGroupAlbum() {
      this.$router.go(-1);
    },
    onConfirmDeleteImage() {
      let vm = this;
      vm.$api.kehubu.destroyGroupAlbumImage(vm.willDeleteImage.id).then(function (res) {
        vm.$notify({message: '删除成功', background: '#07c160'});
        vm.images.splice(vm.willDeleteImageIndex, 1);
        vm.willDeleteImage = null;
        vm.willDeleteImageIndex = null;
      }).catch(function (err) {
        console.log(err);
        vm.$notify("删除失败");
      });
    },
    deleteImage (index, confirmed) {
      let vm = this;
      vm.willDeleteImageIndex = index;
      let image = vm.images[index];
      if (image.id === undefined) {
        vm.images.splice(index, 1);
        vm.willDeleteImage = null;
        vm.willDeleteImageIndex = null;
      } else {
        vm.willDeleteImage = image;
      }
    },
    gotoGroupList() {
      this.$router.push({name: "GroupList"});
    },
    onRead(file, detail) {
      let vm = this;
      vm.images.push({name: file.file.name, content: file.content});
      console.log(file, detail);
    },
    destroyGroupAlbum() {
      Dialog.confirm({
        title: '确认删除相册',
        message: '你确认删除相册，删除后所有相关内容就不可恢复！'
      }).then(() => {
        let vm = this;
        vm.$api.kehubu.destroyGroupAlbum(vm.id).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupAlbumList", params:{groupId: vm.groupId}});
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }).catch(() => {
        // on cancel
      });
    },
    saveGroupAlbum () {
      let vm = this;
      let formData = new FormData();
      formData.append('title', vm.title);
      formData.append('group', vm.currentGroup.id);
      formData.append('description', vm.description);
      formData.append('is_visible', vm.is_visible);
      if (vm.images) {
        for(var i=0; i<vm.images.length; i++) {
          var image = vm.images[i];
          if (image.id === undefined) {
            formData.append('images', vm.images[i].content);
          }
        }
      }
      if (vm.isUpdating) {
        vm.$api.kehubu.updateGroupAlbum(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupDetail", params: {id: vm.groupId}});
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      } else {
        vm.$api.kehubu.createGroupAlbum(formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupList"});
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }
    }
  }
}
</script>