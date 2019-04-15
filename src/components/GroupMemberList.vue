<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  right-text="设置"
  @click-left="gotoGroupDetail"
  @click-right="gotoGroupDetailSettings"
  />
  <div class="members">
  <van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :offset="50"
    @load="onLoad"
    ref="memberList"
  >
    <van-cell
      v-for="member in members"
      :key="member.id"
      is-link
      center
      :to="{name: 'MemberDetail', params: {id: member.id}}"
    >
      <template slot="default">
        <div class="member">
          <img class="head_image" :src="member.user.kehubu_profile.head_image" v-if="member.user.kehubu_profile.head_image" />
          <van-icon name="user-o" size="50px" v-else class="head_image" />
          <p class="name">{{ member.remark_name || member.user.username }}</p>
          <p class="meta">
            Joined at {{ member.created | moment("from") }} 
            <span v-if="member.inviter">, Invited by <span class="inviter">{{ member.inviter.username }}</span></span>
          </p>
        </div>
      </template>
    </van-cell>
  </van-list>
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
  props: ['groupId'],
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
    gotoGroupDetail() {
      this.$router.push({name: "GroupDetail", params: {id: this.groupId}});
    },
    gotoGroupEdit() {
      this.$router.push({name: "GroupEdit", params: {id: this.$route.params.id}});
    },
    gotoGroupDetailSettings() {
      this.$router.push({name: "GroupDetailSettings", params: {id: this.$route.params.id}});
    },
    onSearch (search) {
      this.search = search;
      this.getMemberList();
    },
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getMemberList(vm.nextQuery);
      } else {
        vm.getMemberList();
      }
    },
    loadGroup() {
      let vm = this;
      vm.$api.kehubu.getGroup(vm.$route.params.groupId).then( res => {
        vm.item = res.data;
      });
    },
    getMemberList(params) {
      let vm = this;
      if (!params) {
        vm.members = [];
        params = {group: vm.$route.params.groupId, limit: 100};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getMemberList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.members.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.memberList.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  },
  
}
</script>
