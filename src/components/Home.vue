<template>
<div class="home">
    <img class="logo" alt="客户簿-沟通客户好助手" src="@/assets/img/kehubu-slogan@3x.png">
    <br />
    <div v-if="isWeiChat">
      <a href="/api/accounts/weixin/login/?process=login">
        <img alt="微信扫码登录" class="login" src="@/assets/img/login_300px.png" />
      </a>
      <p>微信点击二维码，快速登陆</p>
    </div>
    <div v-else>
      <img alt="微信扫码登录" class="login" src="@/assets/img/login_300px.png" />
      <p>微信扫一扫， 快速注册</p>
    </div>
</div>
</template>

<style scoped>
.home {
  margin-top: 20px;
}
.logo {
  width: 300px;
  margin: 5px 0px;
}
.login {
  margin-top: 10px;
  border: 1px dashed #777;
  background-color:#fff;
}
</style>


<script>
export default {
  name: 'Home',
  computed: {
    isWeiChat() {
      const ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('micromessenger') !== -1;
    }
  }
}
</script>