<template>
<div>
  <van-nav-bar
  :title="member.user | user_display_name"
  left-arrow
  @click-left="$router.go(-1)"
  />

  <div class="content">

  <van-cell-group>
    <van-cell title="等级" :value="rank.name" @click="showRankChoices=true"/>
    <van-field label="备注名字" v-model="remark_name" placeholder="备注名字" type="text" />
    <van-field label="描述" rows="5" v-model="description" placeholder="描述" type="textarea" />
  </van-cell-group>
  </div>

  <div class="submit-bar">
  <van-button type="primary" @click="save" size="small">保存</van-button>
  &nbsp;
  <van-button v-if="member.user.id !== currentGroup.creator.id" type="danger" @click="destroy" size="small">删除</van-button>
  </div>

  <van-popup v-model="showRankChoices" position="bottom">
    <van-picker
      show-toolbar
      title="等级选择"
      :columns="ranks"
      value-key="name"
      @cancel="onCancel"
      @confirm="onConfirm"
      :default-index="defaultIndex"
    />
  </van-popup>

</div>
</template>

<style lang="less">
.submit-bar {
  margin-top: 10px;
}
.content {
  text-align: left;
}
</style>

<script>
import {mapGetters, mapState} from 'vuex';
import {Dialog} from 'vant';
export default {
  props: ['id', 'member'],
  data() {
    return {
      ranks: [],
      rank: this.member.rank,
      showRankChoices: false,
      remark_name: this.member.remark_name,
      description: this.member.description,
      isSaving: false,
      isDestroying: false,
    }
  },
  computed: {
    defaultIndex() {
      let vm = this;
      return vm.$_.findIndex(vm.ranks, function (item) {
        if (item.id === vm.member.rank.id) {
          return true;
        } else {
          return false;
        }
      });
    },
    ...mapState('group', ['currentGroup']),
    ...mapGetters('group', ['isCurrentGroupCreator']),
  },
  created() {
    this.getGroupMemberRankList();
  },
  methods: {
    onCancel(picker, value, index) {
      this.showRankChoices = false;
    },
    onConfirm(picker, value, index) {
      this.showRankChoices = false;
      this.rank = picker;
    },
    save() {
      let vm = this;
      let data = {
        rank: vm.rank.id,
        description: vm.description,
        remark_name: vm.remark_name,
      }
      vm.isSaving = true;
      vm.$api.kehubu.updateMember(vm.id, data).then( res => {
        vm.$notify({message: '保存成功', background: '#07c160'});
        vm.$router.go(-1);
      }).finally( () => {
        vm.isSaving = false;
      });
    },
    destroy() {
      Dialog.confirm({
        title: '确认删除会员',
        message: '你确认删除会员，删除后所有相关内容就不可恢复！'
      }).then(() => {
        let vm = this;
        vm.$api.kehubu.destroyMember(vm.id).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-2);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }).catch(() => {
        // on cancel
      });
    },
    getGroupMemberRankList() {
      let vm = this;
      let params = {group: vm.member.group, limit: 1000};
      vm.$api.kehubu.getGroupMemberRankList({params: params}).then( res=> {
        vm.ranks = res.data.results;
      });
    },
  }
}
</script>