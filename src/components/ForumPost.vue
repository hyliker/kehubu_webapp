<template>
<div class="root" v-if="post">
  <div class="post">
    <div class="meta">
      <avatar :profile="post.creator.kehubu_profile" size="19px" class="avatar" />
      <span class="creator">{{ post.creator.username }}</span>
      <span class="modified">{{ post.modified | moment("from") }}</span>
      <a class="edit" href="#" v-if="isCreator" @click="toggleEditing">{{ isEditing?"取消编辑":"编辑"}}</a>
    </div>
    <div class="content" v-if="isEditing">
      <van-field type="textarea" v-model="newContent" :error="errors.content" :error-message="errors.content" />
      <van-button type="danger" :disabled="isDestroying" @click="destroyPost" size="small">删除</van-button>
      <van-button type="primary" :disabled="isUpdating" @click="saveTopic" size="small">保存</van-button>
    </div>
    <div class="content" v-else>{{ post.content }}</div>
  </div>
</div>
</template>

<style scoped>
.post {
  margin: 0px;
  background-color: rgb(247, 248, 250);
  padding: 10px;
  border-radius: 5px;
}
.content .van-button {
  margin: 10px 10px 0 0;
}
.edit {
  float: right;
  color: #1989fa;
}
.avatar {
  float: left;
  margin: 0px;
}
.meta {
  padding: 5px 0;
}
.meta span {
  margin-left: 10px;
  margin-top: -5px;
  display: inline-block;
  vertical-align: middle;
}
.content {
  margin: 0px;
  padding: 0px;
}

</style>

<script>
import {getters, mapGetters} from 'vuex';
import Avatar from '@/components/Avatar.vue';
export default {
  props: ['post'],
  components: {
    Avatar,
  },
  data() {
    return {
      newContent: this.post.content,
      isEditing: false,
      isDestroying: false,
      isUpdating: false,
      errors: {}
    }
  },
  computed: {
    ...mapGetters('forum', {
      isCreator: 'isCurrentTopicCreator',
    })
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    saveTopic() {
      let vm = this;
      let formdata = {content: vm.newContent};
      vm.isUpdating = true;
      vm.$api.forum.updatePost(vm.post.id, formdata).then( res => {
        vm.post = res.data;
        vm.isEditing = false;
      }).catch( (err) => {
        if (err.response) {
          vm.errors = err.response.data;
        } else if (err.request) {
          alert(err.request);
        }
      }).finally(() => {
        vm.isUpdating = false;
      });
    },
    destroyPost() {
      let vm = this;
      vm.isDestroying = true;
      vm.$api.forum.destroyPost(vm.post.id).then( res => {
        vm.$emit("delete");
        vm.isEditing = false;
      }).catch( (err) => {
        if (err.response) {
          vm.errors = err.response.data;
        } else if (err.request) {
          alert(err.request);
        }
      }).finally(() => {
        vm.isDestroying = false;
      });
    }
  }
}
</script>