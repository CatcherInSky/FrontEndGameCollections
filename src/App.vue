<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { tempStore, userStore } from '@/store';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { MISSIONNUMS } from './consts';

const tempState = tempStore();
const { process } = storeToRefs(tempState);
const userState = userStore();

// 根据缓存读取关卡进度
if (userState.mission >= MISSIONNUMS) {
  process.value = 0;
} else if (userState.mission === 0) {
  process.value = 0;
} else {
  process.value = userState.mission + 0.5;
}

// 根据进度切换路由
const router = useRouter();
watch(process, (p) => {
  let path = '/';
  if (!p) {
    path = '/start';
  } else if (p > MISSIONNUMS) {
    path = '/end';
  } else if (p === Math.floor(p)) {
    // 整数下一关游戏场景
    path = '/mission';
  } else {
  // 小数数下一关商店场景
    path = '/shop';
  }
  router.push(path);
}, {
  immediate: true,
});

/* eslint-disable no-restricted-globals */
//  禁用前进后退
window.addEventListener('popstate', () => {
  history.pushState(null, '', document.URL);
});

</script>

<style lang="scss">
</style>
