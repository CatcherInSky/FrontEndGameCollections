<template>
  <div id="background">
    <div>分数{{score}}</div>
    <div>
      <button v-for="item in items" :key="item.type"
      @click="buy(item)">{{item.type}}</button>
    </div>
    <button @click="go">购买完毕</button>
  </div>
</template>
<script lang="ts" setup>
import { missionStore, tempStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ItemsEnum } from '@/types';
import { onMounted } from 'vue';
import { itemsCreator } from '@/utils/items';

// 购买修改关卡状态
const missionState = missionStore();

onMounted(() => {
  missionState.reset();
});

const { score } = storeToRefs(missionState);
const items = itemsCreator();

const buy = ({ price, type }: any) => {
  missionState.score -= price;
  if (type === ItemsEnum.POD) {
    missionState.powder += 1;
  } else {
    missionState.buffs.push(type);
  }
};

const tempState = tempStore();
const go = () => {
  tempState.process += 0.5;
};

</script>

<style lang="scss">
</style>
