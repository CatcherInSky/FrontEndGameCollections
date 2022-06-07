<template>
    <div>关卡：{{process}}</div>

    <div>时间：{{time.toFixed(0)}}</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { missionStore, tempStore } from '@/store';

const missionState = missionStore();
const { time } = storeToRefs(missionState);
const tempState = tempStore();
const { process } = storeToRefs(tempState);
</script>
