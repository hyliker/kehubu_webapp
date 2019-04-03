import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import GroupList from './components/GroupList.vue';


const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/GroupList', name: 'GroupList', component: GroupList},
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;