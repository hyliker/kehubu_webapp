<template>
  <div class="root">
    <van-nav-bar
  title="编辑版块"
  left-arrow
  @click-left="$router.go(-1)"
  />
  <van-cell-group>
    <van-field label="名称" v-model="name" type="input" placeholder="请输入版块名称"/>
    <van-field label="优先级" v-model="priority" type="number" placeholder="数字越大越优先"/>
    <van-field label="描述" v-model="description" type="textarea" rows="5" placeholder="请输入版块描述"/>
    <van-field label="图标" type="file" @change="getFile($event, 'icon')" />
  </van-cell-group>


<van-cell>
    <van-button type="danger" size="small" v-if="id && isCreator" @click="destroyTopic">删除</van-button>
    &nbsp;
    <van-button type="primary" size="small" @click="saveCategory">保存</van-button>
</van-cell>


  </div>
</template>

<style scoped>

</style>

<script>
import { mapState } from 'vuex';
export default {
  props: ['id'],
  data() {
    return {
      name: '',
      description: '',
      iconData: null,
      icon: null,
      priority: null,
    }
  },
  created() {
    let vm = this;
    vm.$api.forum.getCategory(vm.id).then( res=> {
      vm.name = res.data.name;
      vm.description = res.data.description;
      vm.priority = res.data.priority;
      vm.icon = res.data.icon;
    });
  },
  computed: {
    isUpdating () {
      return this.id !== undefined;
    }, ...mapState({
      group: state => state.currentGroup,
    })
  },
  methods: {
    getFile(evt, field) {
      let vm = this;
      vm[field] = evt.target.files[0];
      const reader = new FileReader;
      reader.onload = e => {
        vm[field + "Data"]= e.target.result;
      }
      reader.readAsDataURL(evt.target.files[0]);
    },
    saveCategory() {
      let vm = this;
      let formData = new FormData();
      formData.append('name', vm.name);
      formData.append('description', vm.description);
      formData.append('group', vm.group.id);
      formData.append('parent', '');
      if (vm.priority !== null) {
        formData.append('priority', vm.priority);
      }
      if (vm.iconData) {
        formData.append('icon', vm.icon);
      }
      if (vm.isUpdating) {
        vm.$api.forum.updateCategory(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      } else {
        vm.$api.forum.createCategory(formData).then(function (res) {
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