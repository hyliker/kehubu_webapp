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

<van-cell-group>
  <van-field label="公告" type="textarea" rows="5" v-model="notice" placeholder="请输入公告内容" />
  <van-switch-cell v-model="notice_enabled" title="发布公告" />
  </van-cell-group>
</van-cell-group>

<br />
<van-button v-if="isUpdating" type="danger" plain size="large" @click="destroyGroup">删除</van-button>

</div>
</template>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}

</style>

<script>
import { Dialog } from 'vant';

export default {
  props: ['id'],
  data () {
    return {
      name: '',
      description: '',
      weighting: 0,
      logo: null,
      logoData: null,
      notice: '',
      notice_enabled: false
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
        vm.notice = res.data.notice;
        vm.notice_enabled = res.data.notice_enabled;
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
    saveGroup () {
      let vm = this;
      let formData = new FormData();
      formData.append('name', vm.name);
      formData.append('description', vm.description);
      formData.append('weighting', vm.weighting);
      formData.append('notice', vm.notice);
      formData.append('notice_enabled', vm.notice_enabled);
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