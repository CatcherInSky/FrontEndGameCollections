<template>
  <div id="background" :style="`width:${WIDTH}px;height:${HEIGHT}px`" >
    <div id="sky" :style="`height:${SKYHEIGHT}px`">
      <div id="left">
        <ScorePanel />
      </div>
      <div id="center">
        <HookTool v-for="hook in hooks" :key="hook.id" v-bind="{hook: hook}"/>
      </div>
      <div id="right">
        <CountDown />
      </div>
    </div>
    <div id="ground" :style="`height:${GROUNDHEIGHT}px`">
      <MineralsItem v-for="mineral in minerals" :key="mineral.id" v-bind="mineral"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  hook1Store, hook2Store, missionStore, userStore, tempStore,
} from '@/store';
import {
  WIDTH, HEIGHT, SKYHEIGHT, GROUNDHEIGHT, MISSIONNUMS,
} from '@/consts';
import { onMounted, onBeforeUnmount } from 'vue';
import missions from '@/maps/missions';
import { storeToRefs } from 'pinia';
import ScorePanel from '@/components/ScorePanel.vue';
import core from '@/utils/core';
import HookTool from '@/components/HookTool.vue';
import targetCreator from '@/utils/targets';
import { MineralsObject } from '@/types';
import MineralsItem from '../components/MineralsItem.vue';
import CountDown from '../components/CountDown.vue';

const userState = userStore();
const hookList = [hook1Store(), hook2Store()];
const missionState = missionStore();
const { minerals } = storeToRefs(missionState);
const tempState = tempStore();
let timer: undefined | number;
const hooks = Array.from({
  length: userState.people,
}, (_, index) => hookList[index]);

const judge = () => {
  if (missionState.score >= missionState.target) {
    console.log('数据达标');
    // 数据达标
    userState.mission = tempState.process;
    userState.powder = missionState.powder;
    userState.score = missionState.score;
    tempState.process += 0.5;
  } else {
    console.log('数据不达标');
    // 数据不达标
    tempState.process = MISSIONNUMS + 0.5;
  }
};

onMounted(() => {
  // 设置关卡状态
  missionState.target = targetCreator(tempState.process);
  missionState.minerals = missions[tempState.process - 1] as MineralsObject[];
  // 重置hook
  hooks.forEach((hook, index) => hook.reset(index, userState.people));
  // 运行定时器
  timer = core(judge);
});
onBeforeUnmount(() => {
  clearInterval(timer);
});

</script>

<style lang="scss">
#background {
}
#sky {
  display: flex;
  width: 100%;
  background-color: yellow;
  border-bottom: 1px solid #000;
  #left {
    width: 200px;
  }
  #right {
    width: 200px;
  }
  #center {
    flex: 1;
    position: relative;
  }
}
#ground {
  width: 100%;
  background-color: brown;
  position: relative
}
</style>
