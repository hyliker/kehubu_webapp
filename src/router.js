import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import GroupList from './components/GroupList.vue';
import GroupEdit from './components/GroupEdit.vue';
import GroupDetail from './components/GroupDetail.vue';


const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/GroupList', name: 'GroupList', component: GroupList},
  {path: '/GroupEdit', name: 'GroupEdit', component: GroupEdit},
  {path: '/GroupDetail/:id', name: 'GroupDetail', component: GroupDetail},
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;