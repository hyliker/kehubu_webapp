<template>
<div>
    <van-nav-bar
  :title="title"
  left-text="返回"
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
    ref="profiles"
  >
    <van-cell
      v-for="profile in profiles"
      :key="profile.id"
      is-link
      center
      :to="{name: 'UserChat', params: {userId: profile.user.id}}"
    >
      <template slot="default">
        <div class="member">
          <avatar :profile="profile" size="50px" class="avatar" />
          <div class="meta">
            <p class="name">{{ profile.user.username }}</p>
            <p class="join">Joined at {{ profile.user.date_joined | moment("from") }} 
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
  components: {
    Avatar,
  },
  data() {
    return {
      profiles: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
    }
  },
  computed: {
    title () {
      return `群友(${this.profiles.length})`;
    }
  },
  created () {
  },
  methods: {
    onSearch (search) {
      this.search = search;
      this.getProfileList();
    },
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getProfileList(vm.nextQuery);
      } else {
        vm.getProfileList();
      }
    },
    getProfileList(params) {
      let vm = this;
      if (!params) {
        vm.profiles = [];
        params = {limit: 100, ordering: '-id'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getProfileList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.profiles.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.profiles.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  },
  
}
</script>