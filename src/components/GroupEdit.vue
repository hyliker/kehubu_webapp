<template>
<div>
    <van-nav-bar
  title="群组"
  left-text="取消"
  right-text="保存"
  @click-left="gotoGroupList"
  @click-right="saveGroup"
  />


<van-cell-group>
  <van-field label="名称" required v-model="name" placeholder="请输入名称" />
  <van-field label="描述" type="textarea" rows="3" v-model="description" placeholder="请输入描述" />
  <van-field label="权重" type="number" v-model="weighting" placeholder="请输入权重" />
  <van-field label="徽标" type="file" @change="getFile($event)" />
  <img :src="logo" class="logo" v-if="isUpdating && !logoData" />
  <img :src="logoData" class="logo" v-if="logoData" />
</van-cell-group>

<van-button v-if="isUpdating" type="danger" plain size="small" @click="destroyGroup">删除</van-button>

</div>
</template>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}

</style>

<script>
export default {
  props: ['id'],
  data () {
    return {
      name: '',
      description: '',
      weighting: 0,
      logo: null,
      logoData: null,
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
      vm.$api.kehubu.getGroup(vm.id).then( res => {
        vm.name = res.data.name;
        vm.description = res.data.description;
        vm.weighting = res.data.weighting;
        vm.logo = res.data.logo;
      });
    }
  },
  methods: {
    gotoGroupList() {
      this.$router.push({name: "GroupList"});
    },
    getFile(evt) {
      let vm = this;
      vm.logo = evt.target.files[0];
      const reader = new FileReader;
      reader.onload = e => {
        vm.logoData = e.target.result;
      }
      reader.readAsDataURL(evt.target.files[0]);
    },
    destroyGroup() {
      let vm = this;
      vm.$api.kehubu.destroyGroup(vm.id).then(function (res) {
        vm.$notify({message: '保存成功', background: '#07c160'});
        vm.$router.push({name: "GroupList"});
      }).catch(function (err) {
        console.log(err);
        vm.$notify("保存失败");
      });
    },
    saveGroup () {
      let vm = this;
      let formData = new FormData();
      formData.append('name', vm.name);
      formData.append('description', vm.description);
      formData.append('weighting', vm.weighting);
      if (vm.logoData) {
        formData.append('logo', vm.logo);
      }
      if (vm.isUpdating) {
        vm.$api.kehubu.updateGroup(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push({name: "GroupDetail", params: {id: vm.id}});
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      } else {
        vm.$api.kehubu.createGroup(formData).then(function (res) {
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