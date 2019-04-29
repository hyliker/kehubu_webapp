<template>
<div class="root">
    <van-nav-bar
  title="发文章"
  left-arrow
  @click-left="$router.go(-1)"
  />

<van-cell>
    <van-field
      v-model="title"
      placeholder="请输入你的标题"
    />
</van-cell>
<van-cell class="editor-wrap">
  <quill-editor v-model="content"
                ref="myQuillEditor"
                class="editor"
                :options="editorOption"
                >
  </quill-editor>
</van-cell>
<van-cell>
    <van-button type="danger" size="small" :disabled="isDestroying" v-if="id" @click="destroyTopic">
      {{ isDestroying? "删除中": "删除"}}
    </van-button>
    &nbsp;
    <van-button type="primary" size="small" :disabled="isSaving" @click="saveTopic">
      {{ isSaving ? "保存中": "保存"}}
    </van-button>
</van-cell>
</div>
</template>

<style scoped>
.editor {
  height: 600px;
}
.editor-wrap {
  height: 100%;
}

</style>

<script>
import {mapState} from 'vuex';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

export default {
  props: ['id'],
  components: {
    quillEditor,
  },
  data () {
    return {
      title: '',
      content: '',
      isDestroying: false,
      isSaving: false,
      editorOption: {
        theme: 'snow',
      }
    }
  },
  computed: {
    isUpdating () {
      return this.id !== undefined;
    },
    ...mapState('forum', {
      category: 'currentCategory',
    }),
  },
  created () {
    let vm = this;
    if (vm.isUpdating) {
      vm.$api.forum.getTopic(vm.id).then( res => {
        vm.title = res.data.title;
        vm.content = res.data.content;
        if (vm.$store.state.profile.profile.user.id === res.data.creator.id) {
          vm.isCreator = true;
        }
      });
    }
  },
  methods: {
    destroyTopic() {
      let vm = this;
      vm.isDestroying = true;
      vm.$api.forum.destroyTopic(vm.id).then( res => {
        vm.$notify({message: '删除成功'});
        vm.$router.go(-2);
      }).finally( () => {
        vm.isDestroying = false;
      });
    },
    saveTopic() {
      let vm = this;
      let formData = new FormData();
      formData.append('title', vm.title);
      formData.append('content', vm.content);
      formData.append('category', vm.category.id);
      vm.isSaving = true;
      if (vm.isUpdating) {
        vm.$api.forum.updateTopic(vm.id, formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        }).finally( () => {
          vm.isSaving = false;
        });
      } else {
        vm.$api.forum.createTopic(formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.go(-1);
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        }).finally( () => {
          vm.isSaving = false;
        });
      }
    }

  }
}
</script>