<template>
  <div>
    <van-nav-bar
  title="群二维码名片"
  left-text="返回"
  @click-left="$router.go(-1)"
  />
  <div class="content">
  <van-cell>
    <div class="meta">
      <group-avatar :group="group" size="50px" class="avatar" />
      <span class="name">{{ group.name }}</span>
    </div>
    <qrcode class="qrcode" tag="img" :value="link" :options="{margin: 0}" v-if="link"></qrcode>
    <p class="description">用微信扫一扫上面的二维码图案，加入群组</p>
    </van-cell>
  </div>
  </div>
</template>

<style>
.content {
  margin: 5px;
}
.name {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 1.5em;
}
.description {
  text-align: center;
  margin-top: 20px;
}
.avatar {
  float: left;
}
.qrcode {
  width: 100%;
  margin-top: 5px;
}

</style>


<script>
import GroupAvatar from '@/components/GroupAvatar.vue';
import {mapState} from 'vuex';
export default {
  props: ['id'],
  components: {
    GroupAvatar,
  },
  data: function () {
    return {
      link: '',
    }
  },
  computed:{
    ...mapState({
      group: state => state.currentGroup,
    })
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    }
  },
  created () {
    let vm = this;
    var params = {group: vm.id, valid: 1};
    vm.$api.kehubu.getGroupInvitationList({params: params}).then( res => {
      if (res.data.count === 0) {
        vm.$api.kehubu.createGroupInvitation({group: vm.id}).then( res => {
          vm.link = res.data.link;
        });
      } else {
        vm.link = res.data.results[0].link;
      }
    });
  }
}
</script>

