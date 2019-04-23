<template>
<div>
  <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  right-text="发文章"
  @click-left="$router.go(-1)"
  @click-right="$router.push({name: 'GroupForumTopicEdit', params: {category: categoryId }})"
  />
  <!--<van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>-->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    ref="topicList"
    :offset="50"
    class="grouplist"
  >
    <van-cell
      v-for="item in topicList"
      :key="item.id"
      is-link
      center
      :to="{name: 'GroupForumTopic', params: {id: item.id}}"
    >
      <template slot="default">
        <div class="category">
          <avatar :profile="item.creator.kehubu_profile" size="50px" class="icon" />
          <div class="meta">
          <p class="cellHeader">
            <span class="name">{{ item.title }}</span>
            <br />
            <span class="topic_count">作者: {{ item.creator.username }}</span>
            <span class="post_count">跟贴: {{ item.post_count }}</span>
            <span class="modified">创建于: {{ item.modified | moment("from") }}</span>
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
import Avatar from '@/components/Avatar.vue';
export default {
  props: ['categoryId'],
  components: {
    Avatar,
  },
  data () {
    return {
      topicList: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
      category: null,
    }
  },
  computed: {
    title() {
      if (this.category) {
        return this.category.name;
      }
      return ''
    }, ...mapState({
      group: state => state.currentGroup,
      newGroupChat: state => state.newGroupChat,
    })
  },
  created() {
    let vm = this;
    vm.$api.forum.getCategory(vm.categoryId).then( res => {
      vm.category = res.data;
    });
  },
  methods: {
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getTopicList(vm.nextQuery);
      } else {
        vm.getTopicList();
      }
    },
    onSearch: function (search) {
      this.getTopicList()
    },
    getTopicList(params) {
      let vm = this;
      if (vm.profile === null) {
        return;
      }
      if (!params) {
        vm.topicList = [];
        params = {category: vm.categoryId, limit: 100, ordering: '-created'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.forum.getTopicList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.topicList.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.topicList.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }
  }
}
</script>

