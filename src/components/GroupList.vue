<template>
  <div class="GroupList">
    <van-nav-bar
  :title="title"
  right-text="创建"
  @click-right="gotoGroupEdit"
  />
    <van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      ref="grouplist"
      :offset="50"
      class="grouplist"
    >
      <van-cell
        v-for="item in groups"
        :key="item.id"
        is-link
        center
        :to="{name: 'GroupDetail', params: {id: item.id}}"
      >
        <template slot="default">
          <div class="GroupCell">
            <img class="GroupLogo" :src="item.logo" v-if="item.logo" />
            <van-icon name="circle" size="50px" v-else class="GroupLogo" />
            <p class="GroupName">{{ item.name }}</p>
            <p class="GroupDescription">{{ item.description.slice(0, 30) }}</p>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<style scoped>
.grouplist {
  margin-bottom: 50px;
}
.GroupLogo {
  width: 50px;
  height: 50px;
  float: left;
  padding-right: 10px;
}
.GroupName {
  font-size: 1.5em;
  padding: 0px;
  margin: 0px;
}
.GroupDescription {
  color: #555;
  margin: 0px;
}
.GroupCell {
  text-align: left;
}

</style>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      groups: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null
    };
  },
  computed: {
    ...mapState({
    profile: state => state.profile,
    }),
    group_count() {
      return this.groups.length;
    },
    title() {
      return `群组 (${this.group_count})`;
    },
  }
  ,
  watch: {
    profile: function (val, oldVal) {
      if (val !== null) {
        this.$emit("ProfileReady", val);
      }
    }
  },
  created() {
    let vm = this;
    vm.$on("ProfileReady", function () {
      vm.getGroupList();
    });
  },
  methods: {
    gotoGroupEdit() {
      this.$router.push("GroupEdit");
    },
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getGroupList(vm.nextQuery);
      } else {
        vm.getGroupList();
      }
    },
    onSearch: function (search) {
      this.getGroupList()
    },
    getGroupList(params) {
      let vm = this;
      if (vm.profile === null) {
        return;
      }
      if (!params) {
        vm.groups = [];
        params = {creator: vm.profile.user.id, limit: 100, ordering: '-modified'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getGroupList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.groups.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.grouplist.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  }
}
</script>