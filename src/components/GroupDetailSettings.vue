<template>
  <div>
    <van-nav-bar
  title="设置"
  left-arrow
  @click-left="$router.go(-1)"
  />

<div v-if="isCreator">
<van-cell-group title="基本信息">
  <van-cell title="名称" :value="group.name" is-link :to="{name: 'GroupEdit', params: {id: id}}" />
  <van-cell title="描述" :value="group.description" is-link :to="{name: 'GroupEdit', params: {id: id}}" />
  <van-cell title="群二维码" is-link :to="{name: 'GroupDetailQRcode', params: {id: id}}">
    <template slot:right>
      <van-icon name="qr" size="20px" />
    </template>
  </van-cell>
  <van-cell title="LOGO" is-link :to="{name: 'GroupEdit', params: {id: id}}" >
    <div slot="right-icon">
      <img slot="right-icon" :src="group.logo" class="logo"/>
      <van-icon name="arrow" />
    </div>
  </van-cell>
  <van-cell title="公告" is-link :value="group.notice" :to="{name: 'GroupEdit', params: {id: id}}" />
    <van-cell title="发布公告">
      <template slot:right>
        <van-switch-cell :disabled="!isCreator" v-model="group.notice_enabled" />
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group title="会员等级">
    <van-cell is-link :key="rank.id" v-for="rank in ranks" :title="rank.name" :value="rank.weighting" 
      :to="{name: 'GroupMemberRankEdit', params: {id: rank.id}}" />
    <van-cell class="addRank" :to="{name: 'GroupMemberRankEdit'}">
      <van-button type="primary" size="small">新增</van-button>
    </van-cell>
  </van-cell-group>
  </div>
  <div v-else>
  <van-cell-group>
    <van-cell title="名称" :value="group.name" />
    <van-cell title="描述" :value="group.description" />
    <van-cell title="群二维码" is-link :to="{name: 'GroupDetailQRcode', params: {id: id}}">
      <template slot:right>
        <van-icon name="qr" size="20px" />
      </template>
    </van-cell>
    <van-cell title="LOGO" />
      <div slot="right-icon">
        <img slot="right-icon" :src="group.logo" class="logo"/>
        <van-icon name="arrow" />
      </div>
    </van-cell>
    <van-cell title="公告" :value="group.notice" />
      <van-cell title="发布公告">
        <template slot:right>
          <van-switch-cell disabled v-model="group.notice_enabled" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</div>
</template>

<style lang="css" scoped>
.van-cell .addRank {
  text-align: center;
}
.logo {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.content {
  text-align: left;
}
.van-cell {
  text-align: left;
}
  
</style>

<script>
import {mapState, mapGetters} from 'vuex';
export default {
  props: ['id'],
  data: function () {
    return {
      ranks: [],
    }
  },
  computed: {
    ...mapState('group', {
      group: 'currentGroup',
    }),
    ...mapGetters('group', {
      isCreator: 'isCurrentGroupCreator',
    })
  },
  methods: {
    getGroupMemberRankList() {
      let vm = this;
      let params = {group: vm.id, limit: 1000};
      vm.$api.kehubu.getGroupMemberRankList({params: params}).then( res=> {
        vm.ranks = res.data.results;
      });
    },
  },
  created() {
    this.getGroupMemberRankList();
  }
}
</script>
