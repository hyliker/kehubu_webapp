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
  <draggable v-model="images" group="image" @start="drag=true" @end="drag=flase">
  <div v-for="image, index in images">
    <div class="imagewrap">
    <img :src="image.content" />
    <van-button type="default" size="small" class="deleteButton" @click="deleteImage(index)">删除</van-button>
    </div>
  </div>
  </draggable>
  <van-uploader accept="images/*" :after-read="onRead" class="uploader">
    <van-icon name="plus" size="30px" class="plus" />
  </van-uploader>
</van-cell-group>

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
import draggable from 'vuedraggable'
export default {
  props: ['id', 'groupId'],
  components: {
    draggable,
  },
  data () {
    return {
      title: '',
      description: '',
      images: [],
      is_visible: true,
    }
  },
  computed: {
    isUpdating () {
      return this.id !== undefined;
    }
  },
  created () {
    let vm = this;
    if (vm.isUpdating) {
      vm.$api.kehubu.getGroupAlbum(vm.id).then( res => {
        vm.name = res.data.name;
        vm.description = res.data.description;
        vm.is_visible = res.data.is_visible;
      });
    }
  },
  methods: {
    gotoGroupAlbum() {
      this.$router.go(-1);
    },
    deleteImage (index) {
      console.log('index', index);
      this.images.splice(index, 1);
    },
    gotoGroupList() {
      this.$router.push({name: "GroupList"});
    },
    onRead(file, detail) {
      let vm = this;
      vm.images.push({name: file.file.name, content: file.content});
      console.log(file, detail);
    },
    destroyGroup() {
      Dialog.confirm({
        title: '确认删除群组',
        message: '你确认删除群组，删除后所有相关内容就不可恢复！'
      }).then(() => {
        let vm = this;
        vm.$api.kehubu.destroyGroup(vm.id).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupList"});
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
      formData.append('group', vm.groupId);
      formData.append('description', vm.description);
      formData.append('is_visible', vm.is_visible);
      if (vm.images) {
        for(var i=0; i<vm.images.length; i++) {
          formData.append('images', vm.images[i].content);
        }
      }
      if (vm.isUpdating) {
        vm.$api.kehubu.updateGroupAlbum(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupDetail", params: {id: vm.id}});
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