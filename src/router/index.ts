import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import KeyInfoView from '@/views/KeyInfoView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'KeyInfo',
    component: KeyInfoView,
  },
  {
    path: '/chords',
    name: 'Chords',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChordView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
