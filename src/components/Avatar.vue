<template>
<div>
  <img class="head_image" :src="profile.head_image" v-if="profile.head_image" :width="size" :height="size" />
  <van-icon name="user-circle-o" :size="size" v-else />
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
    profile: Object,
  }
}
</script>

