import { createRouter, createWebHistory } from 'vue-router';
import GameScene from './scenes/GameScene.vue';
import ShopScene from './scenes/ShopScene.vue';
import OpenScene from './scenes/OpenScene.vue';
import EndScene from './scenes/EndScene.vue';

const routes = [
  {
    path: '/shop',
    component: ShopScene,
  },
  {
    path: '/mission',
    component: GameScene,
  },
  {
    path: '/start',
    component: OpenScene,
  },
  {
    path: '/end',
    component: EndScene,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    /* eslint-disable no-restricted-globals */
    //  禁用前进后退
    history.pushState(null, '', document.URL);
  },
});

export default router;
