<template>
    <div :style="containerStyle">
      <div class="button">
        <button @click="go">抓</button>
        <button @click="boom" :disabled="powder <= 0 || mineral === null">炸</button>
      </div>
      <div :style="gifStyle"></div>
      <div style="position: relative;">
        <div class="hook" :style="hookStyle">
            <div class="line" :style="lineStyle"></div>
            <div class="grasp" :style="graspStyle"></div>
        </div>
      </div>
      <div style="text-align: center;">{{score}}</div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, toRefs, computed } from 'vue';
import { missionStore, userStore } from '@/store';
import {
  HOOKRADIUS, MINERSIZE, SKYHEIGHT, MINERPOS, HOOKHEIGHT, HOOKWIDTH,
} from '@/consts';
import { HookState } from '@/types';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  hook: HookState
}>();
const {
  angle, extend, length, mineral, score,
} = toRefs(props.hook);

const userState = userStore();

// 动态样式
const containerStyle = computed(() => `
  z-index: 10;
  position: absolute;
  top: ${SKYHEIGHT - MINERSIZE[1]}px;
  left: ${MINERPOS[props.hook.id + userState.people - 1] - (MINERSIZE[0] / 2)}px;
`);
// todo 贴动图
const gifStyle = computed(() => `
  background: blue;
  width: ${MINERSIZE[0]}px;
  height: ${MINERSIZE[1]}px;
`);
const hookStyle = computed(() => `
    transform: rotate(${angle.value}deg);
    top: -${HOOKHEIGHT}px;
    left: ${MINERSIZE[0] / 2 - HOOKWIDTH / 2}px
`);
const lineStyle = computed(() => `
    height: ${length.value}px
`);
// todo 根据抓到矿物换贴图
const graspStyle = computed(() => `
      height: ${HOOKRADIUS * 2}px;
      width: ${HOOKRADIUS * 2}px; 
      top: -${HOOKRADIUS - HOOKWIDTH / 2}px;
      left: -${HOOKRADIUS - HOOKWIDTH / 2}px;
`);

const go = () => {
  // 摇摆时才能出钩
  if (extend.value === 0) extend.value = 1;
};

const missionState = missionStore();
const { powder } = storeToRefs(missionState);
const boom = () => {
  if (powder.value > 0 && mineral.value !== null) {
    mineral.value = null;
    powder.value -= 1;
    // todo: 炸药附近也会爆炸
  }
};
// 根据类型切换贴图
</script>

<style lang="scss">
.button {
  position: absolute;
}
.hook {
  position: absolute;
  transform-origin:  top center;
}
.line {
  background-color: #000;
  width: 2px;
  left: calc(50% - 1px);
}
.grasp {
  position: relative;
  border-radius: 100%;
  background-color: green;
}
</style>
