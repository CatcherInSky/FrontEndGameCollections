<template>
    <div class="minerals" :style="style" ></div>
</template>
<script lang="ts" setup>
import { MineralsEnum } from '@/types';
import { defineProps, toRefs, computed } from 'vue';
// import { MineralsProps } from '@/types';
// type argument passed must be a literal type, or a reference to an interface or literal type.
//  等vue修复
const props = defineProps<{
    x: number,
    y: number,
    radius: number,
    type: string,
}>();

const colorMap: Record<string, string> = {
  [MineralsEnum.GOLD]: 'yellow',
  [MineralsEnum.ROCK]: 'gray',
  [MineralsEnum.DIAMOND]: 'blue',
  [MineralsEnum.EXP1]: 'brown',
  [MineralsEnum.EXP2]: 'brown',
  [MineralsEnum.RAT1]: 'black',
  [MineralsEnum.RAT2]: 'blue',
  [MineralsEnum.UN]: 'green',
};
const {
  x, y, radius, type,
} = toRefs(props);
const style = computed(() => `
  top: ${y.value - radius.value}px; 
  left:${x.value - radius.value}px;
  width: ${radius.value * 2}px; 
  height: ${radius.value * 2}px;
  background:${colorMap[type.value]};
 `);

// 根据类型切换贴图
</script>

<style lang="scss">
.minerals {
  text-align: center;
  vertical-align: middle;
  background-color: #fff;
  position: absolute;
  border-radius: 100%;
}
</style>
