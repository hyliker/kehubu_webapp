<template>
  <div class="copyright">
    <p>&copy; 2017 kehubu.com, All Rights Reserved. </p>
    <p class="beian">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44172102000125">
      <img alt="公安备案" src="@/assets/ghs.png">粤公网安备 44172102000125号
      </a>
      <br />
      <a href="http://www.miitbeian.gov.cn/" target="_blank">ICP备17034275号-1</a>
    </p>
  </div>
</template>

<style scoped>
.copyright {
  padding: 10px;
  text-align: center;
  color: #555;
  font-size: 12px;
}
.copyright a:link {
  color: #555;
}

.beian {
  margin-top: -12px;
}

.beian img {
  width: 12px;
  height: 12px;
}

</style>

<script>
export default {
  name: 'Copyright'
}
</script>