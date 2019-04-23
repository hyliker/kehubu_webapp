<template>
<div>
  <van-nav-bar
  :title="title"
  left-arrow
  @click-left="$router.go(-1)"
  :right-text="rightText"
  @click-right="onClickRight"
  />
  <van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>
  <van-cell v-if="isEditing" class="toolbar">
    <router-link :to='{name: "GroupForumCategoryEdit"}'>
    <van-button type="primary" size="small">新增版块</van-button>
    </router-link>
  </van-cell>
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
      :is-link="!isEditing"
      center
      @click="gotoGroupForumCategory(item)"
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
            <span class="modified" v-if="!isEditing">{{ item.modified | moment("from") }}</span>
            <div class="edit" v-if="isEditing">
              <router-link :to='{name: "GroupForumCategoryEdit", params: {id: item.id}}'>
              <van-button size="small" type="primary">编辑</van-button>
              </router-link>
              <van-button size="small" type="danger" @click="confirmDeleteCategory(item)">删除</van-button>
            </div>
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
.edit {
  float: right;
  margin-top: -30px;
}
.edit button {
  margin-left: 10px;
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
import {Dialog} from 'vant';
import { mapState } from 'vuex';
import ForumCategoryIcon from '@/components/ForumCategoryIcon.vue';
export default {
  props: ['groupId'],
  components: {
    ForumCategoryIcon,
  },
  data () {
    return {
      categoryList: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null,
      isEditing: false,
    }
  },
  computed: {
    rightText() {
      console.log('rightText', this.isEditing);
      if (this.isGroupCreator) {
        if (this.isEditing) {
          return "取消编辑";
        } else {
          return "编辑";
        }
      } else {
        return "";
      }
    },
    isGroupCreator() {
      if (this.$store.state.profile.user.id === this.group.creator.id) {
        return true;
      } else {
        return false;
      }
    },
    title() {
      return `${this.group.name} - 论坛`;
    }, ...mapState({
      group: state => state.currentGroup,
      newGroupChat: state => state.newGroupChat,
    })
  },
  created() {
    //this.getCategoryList();
  },
  methods: {
    gotoGroupForumCategory(item) {
      if (this.isEditing) {
        console.log('nothing');
      } else {
        this.$router.push({name: 'GroupForumCategory', params: {categoryId: item.id}});
      }
    },
    confirmDeleteCategory(item) {
      let vm = this;
      Dialog.confirm({ 
        title: `确认删除这个版块:${item.name}`,
        message: `确认删除这个版块:${item.name}, 删除后，就无法恢复`,
      }).then( () => {
        vm.$api.forum.destroyCategory(item.id).then( res => {
          vm.categoryList = vm.categoryList.filter(function (category) {
            return (category.id !== item.id);
          })
          console.log('delete done');
        });
      }).catch( () => {

      });
    },
    onClickRight() {
      console.log('isEditing', this.isEditing);
      this.isEditing = !this.isEditing;
    },
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
        params = {level: 0, limit: 100, group: vm.groupId, ordering: '-priority'};
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

