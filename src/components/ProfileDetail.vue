<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="goBack"
  v-if="isNavBar"
  />
  <div v-if="profile">
    <div class="header">
      <avatar :profile="profile" class="avatar" size="50px" />
      <p class="name">{{ profile.nickname }}</p>
      <p class="username">用户名: {{ profile.user.username }}</p>
    </div>
    <van-cell-group title="基本信息" class="profile">
      <van-cell title="邮箱" :value="profile.user.email " />
      <van-cell title="姓名" :value="profile.nickname" />
      <van-cell title="性别" :value="profile.gender" />
      <van-cell title="生日" :value="profile.birthdate" />
      <van-cell title="国家" :value="profile.country" />
      <van-cell title="省份" :value="profile.province" />
      <van-cell title="城市" :value="profile.city" />
    </van-cell-group>
  </div>
</div>
</template>

<style scoped>
.header {
  text-align: center;
  background-color: #fff;
  padding-bottom: 10px;
}
.profile {
  text-align: left;
}
.avatar {
  padding: 10px;
}
.name {
  font-size: 1.5em;
  padding: 0px;
  margin: 0px;
}
.meta {
  color: #555;
  margin: 0px;
}
</style>

<script>
import Avatar from "@/components/Avatar.vue";
export default {
  props: ['id'],
  components: {
    Avatar,
  },
  data () {
    return {
      profile: null,
    }
  },
  computed: {
    isNavBar() {
      return this.id !== "me";
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    let vm = this;
    vm.$api.kehubu.getProfile(vm.id).then( res => {
      console.log("kkk", res);
      vm.profile = res.data;
    });
  },
}
</script>