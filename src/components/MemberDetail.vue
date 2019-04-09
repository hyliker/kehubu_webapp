<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="gotoGroupDetail"
  />

  <div class="member">
    <img class="head_image" :src="member.user.kehubu_profile.head_image" v-if="member.user.kehubu_profile.head_image" />
    <van-icon name="circle" size="50px" v-else class="head_image" />
    <p class="name">{{ member.remark_name || member.user.username }}</p>
    <p class="meta">
      Joined at {{ member.created | moment("from") }} 
      <span v-if="member.inviter">, Invited by <span class="inviter">{{ member.inviter.username }}</span></span>
    </p>
    <van-cell-group title="基本信息">
      <van-cell title="姓名" :value="member.user.kehubu_profile.nickname" />
      <van-cell title="性别" :value="member.user.kehubu_profile.gender" />
      <van-cell title="生日" :value="member.user.kehubu_profile.birthdate" />
      <van-cell title="国家" :value="member.user.kehubu_profile.country" />
      <van-cell title="省份" :value="member.user.kehubu_profile.province" />
      <van-cell title="城市" :value="member.user.kehubu_profile.city" />
    </van-cell-group>
  </div>
</div>
</template>

<style scoped>
.inviter {
  font-weight: bold;
}
.head_image {
  width: 50px;
  height: 50px;
  float: left;
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
.member {
  text-align: left;
}
</style>

<script>
export default {
  props: ['id'],
  computed: {
    title () {
      if (this.member) {
        return this.member.user.kehubu_profile.nickname;
      }
    }
  },
  data: function () {
    return {
      member: null
    }
  },
  created() {
    let vm = this;
    vm.$api.kehubu.getMember(vm.id).then( res => {
      console.log("kkk", res);
      vm.member = res.data;
    });
  },
  methods: {
    gotoGroupDetail() {
      let vm = this;
      vm.$router.push({name: "GroupDetail", params: {id: vm.member.group}});
    }
  }
  
}
</script>


