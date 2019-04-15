<template>
<div>
  <img :src="group.logo" v-if="group.logo" :width="size" :height="size" />
  <van-icon name="circle" :size="size" v-else />
</div>
</template>

<style scoped>

</style>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '50px',
    },
    group: Object,
  }
}
</script>