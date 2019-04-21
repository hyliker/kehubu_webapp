<template>
<div>
  <img :src="category.icon" v-if="category.icon" :width="size" :height="size" />
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
    category: Object,
  }
}
</script>