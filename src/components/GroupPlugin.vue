<template>
<div class="plugin">
  <div class="header clearfix">
    <slot name="header">
      <span class="title">{{ title }}</span>
      <span class="settings"><van-icon name="ellipsis" /></span>
    </slot>
  </div>
  <div class="content clearfix">
    <slot name="content"></slot>
  </div>
</div>
</template>

<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.plugin {
  background-color: #fff;
  padding: 10px;
}
.header {
  margin: 0 5px;
}
.title {
  float: left;
}
.settings {
  float: right;
}

</style>

<script>
export default {
  name: 'GroupPlugin',
  props: ['title']
}
</script>