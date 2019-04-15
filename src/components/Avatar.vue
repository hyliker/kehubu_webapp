<template>
<div>
  <img class="head_image" :src="profile.head_image" v-if="profile.head_image" />
  <van-icon name="user-circle-o" :size="size" v-else />
</div>
</template>

<style>

</style>

<script>
export default {
  props: ['size', 'profile']
}
</script>

