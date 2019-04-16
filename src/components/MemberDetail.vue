<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  />

  <div class="member">
    <div class="header">
      <avatar :profile="member.user.kehubu_profile" size="50px" class="avatar" />
      <div class="meta">
        <p class="name">{{ member.remark_name || member.user.username }}</p>
        <p>Joined at {{ member.created | moment("from") }} 
        <span v-if="member.inviter">, Invited by <span class="inviter">{{ member.inviter.username }}</span></span>
        </p>
      </div>
    </div>
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
.avatar {
  float: left;
  padding: 10px;
}
.header {
  padding: 5px;
  background-color: #fff;
}
p.meta {
  margin-top: 10px;
  color: #555;
}
.meta p {
  margin: 0px;
  padding: 5px;
}
p.name {
  font-size: 1em;
}
.member {
  text-align: left;
}
</style>

<script>
import Avatar from "@/components/Avatar.vue";
export default {
  props: ['id'],
  components: {
    Avatar,
  },
  computed: {
    title () {
      if (this.member) {
        return this.member.user.kehubu_profile.nickname;
      } else {
        return "";
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
      vm.member = res.data;
    });
  },
  methods: {
  }
  
}
</script>


