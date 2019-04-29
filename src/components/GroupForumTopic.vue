<template>
<div class="root" v-if="topic">
  <van-nav-bar
  :title="title"
  left-arrow
  :right-text="rightText"
  @click-left="$router.go(-1)"
  @click-right="$router.push({name: 'GroupForumTopicEdit', params: {id: id}})"
  />
  <forum-topic-only :topic="topic" class="topic" />
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
    <forum-post :post="item" slot="default" @delete="onDelete(item)" />
    </van-cell>
  </van-list>

    <van-cell-group>
      <van-field v-model="content" type="textarea" autosize placeholder="请输入你的跟贴">
        <van-button slot="button" size="small" :disabled="submiting || !content" type="primary" @click="createPost">{{ submiting ? "提交中": "提交" }}</van-button>
      </van-field>
    </van-cell-group>
</div>
</template>

<style scoped>
.root {
  background-color: #fff;
}
.topic {
  border-radius: 5px;
}
</style>

<script>
import { mapState, mapGetters } from 'vuex';
import Avatar from '@/components/Avatar.vue';
import ForumPost from '@/components/ForumPost.vue';
import ForumTopicOnly from '@/components/ForumTopicOnly.vue';
export default {
  props: ['id'],
  components: {
    Avatar, ForumPost, ForumTopicOnly,
  },
  data () {
    return {
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
    rightText() {
      if (this.isCreator) {
        return "编辑";
      } else {
        return "";
      }
    },
    title() {
      if (this.topic) {
        return `${this.topic.title}`;
      } else {
        return "";
      }
    }, ...mapState('forum', {
      topic: 'currentTopic',
    }),
    ...mapGetters('forum', {
      isCreator: 'isCurrentTopicCreator',
    }),
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
        vm.$store.commit('forum/setCurrentTopic', res.data);
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
    onDelete(post) {
      this.postList = this.postList.filter( (item) => {
        return item.id !== post.id;
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

