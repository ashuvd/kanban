import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import modal from './components/modal.vue'

const routes = [
  {
    path: '/cards/:id',
    component: modal
  },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;