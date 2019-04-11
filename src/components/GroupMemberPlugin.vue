<template>
<group-plugin :title="title">
  <template v-slot:content>
    <p>member list</p>
  </template>
</group-plugin>
</template>

<script>
import GroupPlugin from '@/components/GroupPlugin.vue';
export default {
  name: "GroupMemberPlugin",
  props: ['title'],
  components: {
    GroupPlugin 
  },
  data () {
    return {
      images: [
        'https://pic.36krcnd.com/201904/11063956/gy7hr25ld6sx91k7.jpeg!1200',
        'https://pic.36krcnd.com/201904/11063956/gy7hr25ld6sx91k7.jpeg!1200',
      ]
    }
  }
}
</script>