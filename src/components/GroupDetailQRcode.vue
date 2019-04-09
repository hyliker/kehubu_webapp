<template>
  <div>
    <van-nav-bar
  title="群二维码名片"
  left-text="返回"
  @click-left="onClickLeft"
  />
   <qrcode class="qrcode" tag="img" :value="link" v-if="link"></qrcode>
  </div>
</template>

<style>
.qrcode {
  width: 100%;
  height: 100%;
}

</style>


<script>
export default {
  props: ['id'],
  data: function () {
    return {
      link: '',
    }
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

