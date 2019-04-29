<template>
<div class="root">
  <van-nav-bar
  title="会员等级"
  left-arrow
  @click-left="$router.go(-1)"
  />
<div class="content">
<van-cell-group>
  <van-field label="名称" v-model="name" placeholder="请输入名称" />
  <van-field label="权重" type="number" v-model="weighting" placeholder="请输入权重" />
</van-cell-group>
<div class="submit">
  <van-button v-if="isUpdating" type="danger" plain size="small" @click="destroyGroupMemberRank">删除</van-button>
  &nbsp;
  <van-button type="primary" plain size="small" @click="saveGroupMemberRank">保存</van-button>
</div>
</div>

</div>
</template>

<style scoped>
.submit {
  margin: 10px;
}


</style>
<script>
import { mapState } from 'vuex';
import { Dialog } from 'vant';
export default {
  props: ['id'],
  data() {
    return {
      name: '',
      weighting: '0',
    }
  },
  computed: {
    isUpdating() {
      return this.id !== undefined;
    }, ...mapState('group', {
      group: 'currentGroup',
    })
  },
  created() {
    let vm = this;
    if (vm.isUpdating) {
      vm.$api.kehubu.getGroupMemberRank(vm.id).then( res => {
        vm.name = res.data.name;
        vm.weighting = res.data.weighting;
      });
    }
  },
  methods: {
    destroyGroupMemberRank() {
      Dialog.confirm({
        title: '确认删除会员等级',
        message: '你确认删除会员等级，删除后所有相关内容就不可恢复！'
      }).then(() => {
        let vm = this;
        vm.$api.kehubu.destroyGroupMemberRank(vm.id).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }).catch(() => {
        // on cancel
      });
    },
    saveGroupMemberRank () {
      let vm = this;
      let formData = new FormData();
      formData.append('name', vm.name);
      formData.append('weighting', vm.weighting);
      formData.append('group', vm.group.id);
      if (vm.isUpdating) {
        vm.$api.kehubu.updateGroupMemberRank(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      } else {
        vm.$api.kehubu.createGroupMemberRank(formData).then(function (res) {
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


