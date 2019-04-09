import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import GroupList from './components/GroupList.vue';
import GroupEdit from './components/GroupEdit.vue';
import GroupDetail from './components/GroupDetail.vue';
import GroupDetailSettings from './components/GroupDetailSettings.vue';
import GroupDetailQRcode from './components/GroupDetailQRcode.vue';
import MemberDetail from './components/MemberDetail.vue';


const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/GroupList', name: 'GroupList', component: GroupList},
  {path: '/GroupEdit/:id?', name: 'GroupEdit', component: GroupEdit, props: true},
  {path: '/GroupDetail/:id', name: 'GroupDetail', component: GroupDetail},
  {path: '/GroupDetailSettings/:id', name: 'GroupDetailSettings', component: GroupDetailSettings, props: true},
  {path: '/GroupDetailQRcode/:id', name: 'GroupDetailQRcode', component: GroupDetailQRcode, props: true},
  {path: '/MemberDetail/:id', name: 'MemberDetail', component: MemberDetail, props: true},
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;