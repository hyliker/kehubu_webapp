<template>
<div>
  <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  />

  <div class="topic" v-if="topic">
    <avatar :profile="topic.creator.kehubu_profile" size="50px" class="icon" />
    <div class="meta">
    <p class="cellHeader">
      <span class="title">{{ topic.title }}</span>
      <br />
      <span class="topic_count">作者: {{ topic.creator.username }}</span>
      <span class="post_count">跟贴: {{ topic.post_count }}</span>
      <span class="modified">创建于: {{ topic.modified | moment("from") }}</span>
    </p>
    <p class="content">{{ topic.content }}</p>
    </div>
  </div>

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    ref="postList"
    :offset="50"
    class="postList"
    >
    <van-cell
      v-for="item in postList"
      :key="item.id"
      center
    >
      <template slot="default">
        <div class="post">
          <avatar :profile="item.creator.kehubu_profile" size="40px" class="icon" />
          <div class="meta">
          <p class="cellHeader">
            <span class="topic_count">作者: {{ item.creator.username }}</span>
            <span class="modified">创建于: {{ item.modified | moment("from") }}</span>
          </p>
          <p class="content">{{ item.content }}</p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>

    <van-cell-group>
      <van-field v-model="content" type="textarea" autosize placeholder="请输入你的跟贴">
        <van-button slot="button" size="small" :disabled="submiting || !content" type="primary" @click="createPost">{{ submiting ? "提交中": "提交" }}</van-button>
      </van-field>
    </van-cell-group>

  </div>
</div>
</template>

<style scoped>
.topic {
  text-align: left;
  padding: 10px;
  background-color: #fff;
  border-bottom: 2px solid #ddd;
}
.topic .title {
  font-size: 1.2em;
  font-weight: bold;
}
.post_count, .topic_count {
  padding-right: 10px;
}
.topic .name {
  font-size: 16px;
}
.topic .content {
  font-size: 15px;
  line-height: 1.6em;
}
.post .icon {
  float:left;
}
.topic .modified {
}
.topic .icon  {
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
import Avatar from '@/components/Avatar.vue';
export default {
  props: ['id'],
  components: {
    Avatar,
  },
  data () {
    return {
      topic: null,
      postList: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
      submiting: false,
      content: '',
    }
  },
  computed: {
    title() {
      if (this.topic) {
        return `${this.topic.title}`;
      } else {
        return "";
      }
    }, ...mapState({
      group: state => state.currentGroup,
      newGroupChat: state => state.newGroupChat,
    })
  },
  created() {
    this.getTopic();
  },
  methods: {
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getPostList(vm.nextQuery);
      } else {
        vm.getPostList();
      }
    },
    getTopic() {
      let vm = this;
      vm.$api.forum.getTopic(vm.id).then( res => {
        vm.topic = res.data;
      });
    },
    createPost() {
      let vm = this;
      vm.submiting = true;
      let data = {content: vm.content, topic: vm.id};
      vm.$api.forum.createPost(data).then( res => {
        vm.postList.push(res.data);
        vm.content = "";
      }).finally(err => {
        vm.submiting = false;
      });
    },
    getPostList(params) {
      let vm = this;
      if (vm.profile === null) {
        return;
      }
      if (!params) {
        vm.postList = [];
        params = {topic: vm.id, limit: 100, ordering: 'created'};
      }
      vm.$api.forum.getPostList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.postList.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.postList.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    },
  }
}
</script>

