<template>
<div>
    <van-nav-bar
  :title="title"
  left-arrow
  @click-left="$router.go(-1)"
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
          <avatar :profile="member.user.kehubu_profile" size="50px" class="avatar" />
          <div class="meta">
            <p>
            <span class="name" v-if="member.remark_name">{{ member.remark_name }}</span>
            <span class="name" v-else>{{ member.user | user_display_name }}</span>
            <span class="gender">{{ member.user.kehubu_profile.gender | gender }}</span>
            </p>
            <p class="location">{{ member.user.kehubu_profile.country }} {{ member.user.kehubu_profile.province }} {{ member.user.kehubu_profile.city }}</p>
            <p class="join">加入于 {{ member.created | moment("from") }} 
            <span v-if="member.inviter">, Invited by <span class="inviter">{{ member.inviter.username }}</span></span>
            </p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
  </div>
</div>
</template>

<style scoped>
.join {
  color: #888;
}
.name, .gender {
  margin-left: 10px;
}
.members {
  clear: both;
}
.inviter {
  font-weight: bold;
}
.avatar {
  float: left;
  padding-right: 10px;
}
.meta p {
  margin: 0px;
}
.name {
  font-size: 1.1em;
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
import Avatar from "@/components/Avatar.vue";
export default {
  props: ['groupId'],
  components: {
    Avatar,
  },
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
        params = {group: vm.$route.params.groupId, limit: 100, ordering: '-created'};
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
