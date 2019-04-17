<template>
<div>
  <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  />
  <!--<van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>-->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    ref="categoryList"
    :offset="50"
    class="grouplist"
  >
    <van-cell
      v-for="item in categoryList"
      :key="item.id"
      is-link
      center
      :to="{name: 'GroupForumCategory', params: {categoryId: item.id}}"
    >
      <template slot="default">
        <div class="category">
          <forum-category-icon :category="item" size="50px" class="icon" />
          <div class="meta">
          <p class="cellHeader">
            <span class="name">{{ item.name }}</span>
            <br />
            <span class="topic_count">主题: {{ item.topic_count }}</span>
            <span class="post_count">跟贴: {{ item.post_count }}</span>
            <span class="modified">{{ item.modified | moment("from") }}</span>
          </p>
          <p class="description van-ellipsis">{{ item.description.slice(0, 50) }}</p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
  </div>
</div>
</template>

<style scoped>
.category {
  text-align: left;
}
.post_count, .topic_count {
  padding-right: 10px;
}
.category .name {
  font-size: 16px;
}
.category .modified {
  float: right;
  color: #999;
}
.category .icon  {
  float: left;
  margin-right: 10px;
}
.meta {
}
.cellHeader {
  text-align: left;
  margin: 0px;
}
.description {
  margin: 0px;
  padding: 0px;
  color: #666;
}

</style>

<script>
import { mapState } from 'vuex';
import { setTimeout } from 'timers';
import ForumCategoryIcon from '@/components/ForumCategoryIcon.vue';
export default {
  components: {
    ForumCategoryIcon,
  },
  data () {
    return {
      categoryList: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null
    }
  },
  computed: {
    title() {
      return `${this.group.name} (${this.group.member_count})`; 
    }, ...mapState({
      group: state => state.currentGroup,
      newGroupChat: state => state.newGroupChat,
    })
  },
  created() {
    //this.getCategoryList();
  },
  methods: {
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getCategoryList(vm.nextQuery);
      } else {
        vm.getCategoryList();
      }
    },
    onSearch: function (search) {
      this.getCategoryList()
    },
    getCategoryList(params) {
      let vm = this;
      if (vm.profile === null) {
        return;
      }
      if (!params) {
        vm.categoryList = [];
        params = {level: 0, limit: 100, ordering: '-priority'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.forum.getCategoryList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.categoryList.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.categoryList.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  }
}
</script>

