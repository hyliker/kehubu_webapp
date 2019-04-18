<template>
<div>
    <van-nav-bar
  title="设置"
  left-arrow
  right-text="保存"
  @click-left="$router.go(-1)"
  @click-right="saveGroup"
  />

<div class="content">
<van-cell-group title="基本信息">
  <van-field label="名称" required v-model="name" placeholder="请输入名称" />
  <van-field label="描述" type="textarea" rows="3" v-model="description" placeholder="请输入描述" />
  <van-field label="权重" type="number" v-model="weighting" placeholder="请输入权重" />
  <van-field label="封面" type="file" @change="getFile($event, 'cover')" />
  <van-field label="徽标" type="file" @change="getFile($event, 'logo')" />
</van-cell-group>

<van-cell-group title="公告设置">
  <van-field label="公告" type="textarea" rows="5" v-model="notice" placeholder="请输入公告内容" />
  <van-switch-cell v-model="notice_enabled" title="发布公告" />
  </van-cell-group>
</van-cell-group>
</div>

<van-button v-if="isUpdating" type="danger" plain size="small" @click="destroyGroup">删除</van-button>
&nbsp;
<van-button v-if="isUpdating" type="primary" plain size="small" @click="saveGroup">保存</van-button>

</div>
</template>

<style scoped>
.content {
  text-align: left;
}
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
      cover: null,
      coverData: null,
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
    getFile(evt, field) {
      let vm = this;
      vm[field] = evt.target.files[0];
      const reader = new FileReader;
      reader.onload = e => {
        vm[field + "Data"]= e.target.result;
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
      if (vm.coverData) {
        formData.append('cover', vm.cover);
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