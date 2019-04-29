<template>
<div>
    <van-nav-bar
  :title="title"
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
            <p>
            <span class="name">{{ profile | profile_display_name }}</span>
            <span class="gender">{{ profile.gender | gender }}</span>
            </p>
            <p class="location">{{ profile.country }} {{ profile.province }} {{ profile.city }}</p>
            <p class="join">加入于{{ profile.user.date_joined | moment("from") }}</p>
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

.avatar {
  float: left;
  padding-right: 10px;
}
.meta p {
  margin: 0px;
}
.name {
  font-size: 1.3em;
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
    this.$store.commit("ui/showTabBar");
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