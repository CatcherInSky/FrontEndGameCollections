<template>
    <div>分数：{{score}}</div>
    <div>目标分数：{{target}}</div>
    <div>增益：{{buffs.join(',')}}</div>
    <div>炸药：{{powder}}</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { missionStore } from '@/store';

const missionState = missionStore();
const {
  target, buffs, score, powder,
} = storeToRefs(missionState);
</script>
