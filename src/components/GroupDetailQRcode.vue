<template>
  <div>
    <van-nav-bar
  title="群二维码名片"
  left-text="返回"
  @click-left="onClickLeft"
  />
   <qrcode class="qrcode" tag="img" :value="`https://www.kehubu.com/api/kehubu/group/${id}/join/`"></qrcode>
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
  computed: {
    qrcode () {
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    }
  }
}
</script>

