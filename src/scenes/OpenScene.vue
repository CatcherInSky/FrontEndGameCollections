<template>
  <div id="background">
    <div>开始游戏</div>
    <button @click="single">单人</button>
    <button @click="double">双人</button>
  </div>
</template>
<script lang="ts" setup>
import { missionStore, userStore, tempStore } from '@/store';

// 重设用户和关卡状态
const userState = userStore();
userState.reset();
const missionState = missionStore();
missionState.reset();

const tempState = tempStore();
const single = () => {
  userState.people = 1;
  tempState.process = 1;
};
const double = () => {
  userState.people = 2;
  tempState.process = 1;
};
</script>

<style lang="scss">
</style>
