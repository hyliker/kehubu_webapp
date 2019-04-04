<template>
  <div class="GroupList">
    <van-nav-bar
  title="群组"
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
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        is-link
        center
      >
        <template slot="default">
          <div class="GroupCell">
            <img class="GroupLogo" :src="item.logo" v-if="item.logo" />
            <van-icon name="circle" size="50px" v-else class="GroupLogo" />
            <p class="GroupName">{{ item.name }}</p>
            <p class="GroupDescription">{{ item.description }}</p>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<style scoped>
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
      list: [],
      loading: false,
      finished: false ,
      search: ''
    };
  },
  computed: mapState({
    profile: state => state.profile,
    })
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
      vm.getGroupList();
    },
    onSearch: function (search) {
      this.getGroupList()
    },
    getGroupList(params) {
      let vm = this;
      if (vm.profile === null) {
        return;
      }
      vm.loading = true;
      vm.finished = false;
      if (!params) {
        vm.list = [];
        params = {creator: vm.profile.user.id, limit: 10};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getGroupList({params: params}).then( res => {
        for(var i=0; i< res.data.results.length; i++) {
          vm.list.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.getGroupList(res.data.next_query);
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  }
}
</script>