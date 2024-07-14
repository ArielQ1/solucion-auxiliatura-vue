import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Segunda from '../pages/Segunda.vue';
import Tercera from '../pages/Tercera.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/segunda', component: Segunda },
  { path: '/tercera', component: Tercera }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
