<template>
<div>

  <van-nav-bar
  title="动态"
  />

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    ref="activityList"
    :offset="50"
  >
    <van-cell
      v-for="item in activityList"
      :key="item.id"
      is-link
      center
    >
      <template slot="default">
        <div class="activity">
            <div class="content">{{ item.description }}</div>
        </div>
      </template>
    </van-cell>
  </van-list>

</div>
</template>

<style>
.content {
  padding: 10px;
}

</style>

<script>
export default {
  data() {
    return {
      activityList: [],
      loading: false,
      finished: false ,
      nextQuery: null
    }
  },
  methods: {

  },
  created () {
    let vm = this;
    vm.$api.kehubu.getActivityList().then( res => {
      vm.activityList = res.data.results;
      console.log("activity", res.data);
    });
  },
  methods: {
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getActivityList(vm.nextQuery);
      } else {
        vm.getActivityList();
      }
    },
    getActivityList(params) {
      let vm = this;
      if (!params) {
        vm.groups = [];
        params = {limit: 100, ordering: '-timestamp'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getActivityList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.groups.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.activityList.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }

  }
}
</script>