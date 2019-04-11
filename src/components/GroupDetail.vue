<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  right-text="设置"
  @click-left="gotoGroupList"
  @click-right="gotoGroupDetailSettings"
  />

  <div class="submenu">
    <van-col span="6">
      <router-link :to="{name: 'GroupMemberList', params: {groupId: id}}">
        <van-icon name="friends-o" size="40px" />
        <br />
        <span class="label">成员 ({{item.member_count}})</span>
        </router-link>
    </van-col>
    <van-col span="6">
        <van-icon name="photo-o" size="40px" />
        <br />
        <span>相册 (3)</span>
    </van-col>
    <van-col span="6">
        <van-icon name="records" size="40px" />
        <br />
        <span>日志 (8)</span>
    </van-col>
    <van-col span="6">
        <van-icon name="add-o" size="40px" />
        <br />
        <span>其它</span>
    </van-col>
</div>
</div>
</template>

<style scoped>
.members {
  clear: both;
}
.submenu {
  margin-top: 10px;
}
.submenu span {
  font-size: 13px;
}

.inviter {
  font-weight: bold;
}
.head_image {
  width: 50px;
  height: 50px;
  float: left;
  padding-right: 10px;
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


<<script>
export default {
  props: ['id'],
  data() {
    return {
      item: {},
      members: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
    }
  },
  computed: {
    title () {
      return this.item.name + `(${this.item.member_count})`;
    }
  },
  created () {
    this.loadGroup();
  },
  methods: {
    gotoGroupList () {
      this.$router.push("/GroupList");
    },
    gotoGroupEdit() {
      this.$router.push({name: "GroupEdit", params: {id: this.$route.params.id}});
    },
    gotoGroupDetailSettings() {
      this.$router.push({name: "GroupDetailSettings", params: {id: this.$route.params.id}});
    },
    loadGroup() {
      let vm = this;
      vm.$api.kehubu.getGroup(vm.$route.params.id).then( res => {
        vm.item = res.data;
      });
    },
  },
  
}
</script>
