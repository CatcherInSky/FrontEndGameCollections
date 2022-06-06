<template>
  <div id="background">
    <div v-if="mission >= MISSIONNUMS">通关</div>
    <div v-else>关卡{{mission + 1}}失败</div>
    <div>最终分数{{score}}</div>
    <div>最高分数{{highest || 0}}</div>
    <button @click="again" v-if="mission < MISSIONNUMS">重来本关</button>
    <button @click="replay">从头开始</button>
  </div>
</template>
<script lang="ts" setup>
import { missionStore, userStore, tempStore } from '@/store';
import { MISSIONNUMS } from '@/consts';

const userState = userStore();
const missionState = missionStore();
const tempState = tempStore();

const { mission, highest } = userState;
// 失败分数不会设置到用户状态上， 成功分数和用户分数相同
const { score } = missionState;
if (score > highest) {
  console.log('保存最高分');
  userState.highest = score;
}

const replay = () => {
  tempState.process = 0;
};

const again = () => {
  if (userState.mission > 0) {
    tempState.process = Math.ceil(userState.mission) + 0.5;
  } else {
    userState.reset();
    missionState.reset();
    tempState.process = 1;
  }
};
</script>

<style lang="scss">
</style>
