import Vue from 'vue';
import { RouteConfig } from 'vue-router';
import { IonicVueRouter } from '@ionic/vue';
import Home from '../views/Home.vue';
import Place from '../views/Place.vue';
import Work from '../views/Work.vue';

Vue.use(IonicVueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/place/:place',
    name: 'place',
    component: Place,
  },
  {
    path: '/place/:place/work/:work',
    name: 'work',
    component: Work,
  }
];

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
