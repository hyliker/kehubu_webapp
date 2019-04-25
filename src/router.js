import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import GroupList from './components/GroupList.vue';
import GroupEdit from './components/GroupEdit.vue';
import GroupDetail from './components/GroupDetail.vue';
import GroupDetailSettings from './components/GroupDetailSettings.vue';
import GroupDetailQRcode from './components/GroupDetailQRcode.vue';
import MemberDetail from './components/MemberDetail.vue';
import ProfileDetail from './components/ProfileDetail.vue';
import ActivityList from './components/ActivityList.vue';
import GroupMemberList from './components/GroupMemberList.vue';
import GroupAlbumList from './components/GroupAlbumList.vue';
import GroupAlbumEdit from './components/GroupAlbumEdit.vue';
import GroupAlbumDetail from './components/GroupAlbumDetail.vue';
import GroupChat from './components/GroupChat.vue';
import GroupForum from './components/GroupForum.vue';
import GroupForumCategory from './components/GroupForumCategory.vue';
import GroupForumTopic from './components/GroupForumTopic.vue';
import GroupForumTopicEdit from './components/GroupForumTopicEdit.vue';
import GroupForumCategoryEdit from './components/GroupForumCategoryEdit.vue';
import UserChat from './components/UserChat.vue';
import GroupFriends from './components/GroupFriends.vue';
import GroupMemberRankEdit from './components/GroupMemberRankEdit.vue';


const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/GroupList', name: 'GroupList', component: GroupList},
  {path: '/GroupEdit/:id?', name: 'GroupEdit', component: GroupEdit, props: true},
  {path: '/GroupDetail/:id', name: 'GroupDetail', component: GroupDetail, props: true},
  {path: '/GroupDetailSettings/:id', name: 'GroupDetailSettings', component: GroupDetailSettings, props: true},
  {path: '/GroupDetailQRcode/:id', name: 'GroupDetailQRcode', component: GroupDetailQRcode, props: true},
  {path: '/MemberDetail/:id', name: 'MemberDetail', component: MemberDetail, props: true},
  {path: '/ProfileDetail/:id', name: 'ProfileDetail', component: ProfileDetail, props: true},
  {path: '/ActivityList', name: 'ActivityList', component: ActivityList},
  {path: '/GroupMemberList/:groupId', name: 'GroupMemberList', component: GroupMemberList, props: true},
  {path: '/GroupAlbumList/:groupId', name: 'GroupAlbumList', component: GroupAlbumList, props: true},
  {path: '/GroupAlbumEdit/:id?', name: 'GroupAlbumEdit', component: GroupAlbumEdit, props: true},
  {path: '/GroupAlbumDetail/:id', name: 'GroupAlbumDetail', component: GroupAlbumDetail, props: true},
  {path: '/GroupChat/:groupId', name: 'GroupChat', component: GroupChat, props: true},
  {path: '/GroupForum/:groupId', name: 'GroupForum', component: GroupForum, props: true},
  {path: '/GroupForumCategory/:categoryId', name: 'GroupForumCategory', component: GroupForumCategory, props: true},
  {path: '/GroupForumTopic/:id', name: 'GroupForumTopic', component: GroupForumTopic, props: true},
  {path: '/GroupForumTopicEdit/:id?', name: 'GroupForumTopicEdit', component: GroupForumTopicEdit, props: true},
  {path: '/GroupForumCategoryEdit/:id?', name: 'GroupForumCategoryEdit', component: GroupForumCategoryEdit, props: true},
  {path: '/UserChat/:userId', name: 'UserChat', component: UserChat, props: true},
  {path: '/GroupFriends/', name: 'GroupFriends', component: GroupFriends, props: true},
  {path: '/GroupMemberRankEdit/:id?', name: 'GroupMemberRankEdit', component: GroupMemberRankEdit, props: true},
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;