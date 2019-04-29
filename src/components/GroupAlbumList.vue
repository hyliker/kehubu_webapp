<template>
  <div>
     <van-nav-bar
  title="相册"
  left-text="返回"
  left-arrow
  right-text="编辑"
  @click-left="$router.go(-1)"
  @click-right="gotoGroupAlbumEdit"
  v-if="isCurrentGroupCreator"
  />
  <van-nav-bar
  v-else
  title="相册"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  />

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    ref="albumlist"
    :offset="50"
    class="albumlist"
  >
    <van-cell
      v-for="album in albums"
      :key="album.id"
      center
      :to="{name: 'GroupAlbumDetail', params: {id: album.id, album: album}}"
    >
      <template slot="default">
        <group-album-swipe :album="album" class="album"></group-album-swipe>
      </template>
    </van-cell>
  </van-list>

</div>
</template>

<style scoped>
.album {
  border-bottom: 1px dashed #ddd;
}

</style>

<script>
import GroupAlbumSwipe from '@/components/GroupAlbumSwipe.vue';
import {mapState, mapGetters} from 'vuex';
export default {
  props: ['groupId'],
  components: {
    GroupAlbumSwipe,
  },
  computed: {
    ...mapState('group', ['currentGroup']),
    ...mapGetters('group', ['isCurrentGroupCreator']),
  },
  data () {
    return {
      albums: [],
      loading: false,
      finished: false ,
      search: '',
      nextQuery: null
    }
  },
  methods: {
    gotoGroupAlbumEdit() {
      this.$router.push({name: "GroupAlbumEdit", params: {groupId: this.groupId}});
    },
    gotoGroupDetail() {
      this.$router.push({name: "GroupDetail", params: {id: this.groupId}});
    },
    onLoad() {
      let vm = this;
      if (vm.nextQuery) {
        vm.getGroupAlbumList(vm.nextQuery);
      } else {
        vm.getGroupAlbumList();
      }
    },
    getGroupAlbumList(params) {
      let vm = this;
      if (!params) {
        vm.albums = [];
        params = {group: vm.groupId, limit: 2, ordering: '-modified'};
      }
      if (vm.search) {
        params.search = vm.search;
      }
      vm.$api.kehubu.getGroupAlbumList({params: params}).then( res => {
        vm.nextQuery = res.data.next_query;
        for(var i=0; i< res.data.results.length; i++) {
          vm.albums.push(res.data.results[i]);
        }
        if (res.data.next_query) {
          vm.loading = false;
          vm.$refs.albumlist.check();
        } else {
          vm.finished = true;
          vm.loading = false;
        }
      });
    }

  }
}
</script>