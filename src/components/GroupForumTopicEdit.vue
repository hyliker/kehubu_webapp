<template>
<div class="root">
    <van-nav-bar
  :title="title"
  left-arrow
  @click-left="$router.go(-1)"
  />

  <van-cell>
    <van-field
      v-model="title"
      placeholder="标题"
    />
  </van-cell>
  <van-cell>
    <van-field
      type="textarea"
      v-model="content"
      placeholder="内容"
      rows="10"
    />
  </van-cell>
  <br />
    <van-button type="danger" size="small" v-if="id && isCreator" @click="destroyTopic">删除</van-button>
    &nbsp;
    <van-button type="primary" size="small" @click="saveTopic">保存</van-button>
</div>
</template>

<style scoped>

</style>

<script>
export default {
  props: ['id', 'category'],
  data () {
    return {
      title: '',
      content: '',
      isCreator: false,
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
      vm.$api.forum.getTopic(vm.id).then( res => {
        vm.title = res.data.title;
        vm.content = res.data.content;
        vm.category = res.data.category;
        if (vm.$store.state.profile.user.id === res.data.creator.id) {
          vm.isCreator = true;
        }
      });
    }
  },
  methods: {
    destroyTopic() {

    },
    saveTopic() {
      let vm = this;
      let formData = new FormData();
      formData.append('title', vm.title);
      formData.append('content', vm.content);
      formData.append('category', vm.category);
      if (vm.isUpdating) {
        vm.$api.forum.updateTopic(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      } else {
        vm.$api.forum.createTopic(formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }
    }

  }
}
</script>