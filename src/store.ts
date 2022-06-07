import {
  UserState, MissionState, HookState,
} from '@/types';
import { defineStore, createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import {
  HOOKLENGTH, TIME, HOOKHEIGHT, MINERPOS, SKYLEFT,
} from './consts';

export const userStore = defineStore('user', {
  // 最终状态
  state: (): UserState => ({
    // 游戏模式
    people: 1,
    // 已通过关卡
    mission: 0,
    // 历史最高
    highest: 0,
    // 当前分数
    score: 0,
    // 持有炸药
    powder: 0,
  }),
  actions: {
    reset() {
      this.mission = 0;
      this.score = 0;
      this.powder = 0;
    },
  },
  persist: {
    enabled: true,
  },
});

export const tempStore = defineStore('temp', {
  state: () => ({
    process: 0,
  }),
});

export const missionStore = defineStore('mission', {
  state: (): MissionState => ({
    // 本关分数
    score: 0,
    // 倒计时
    time: TIME,
    // 本关购买
    powder: 0,
    buffs: [],
    // 本关矿物
    target: 0,
    minerals: [],
  }),
  actions: {
    reset() {
      const { score, powder } = userStore();
      this.score = score;
      this.powder = powder;
      this.time = TIME;
      this.buffs = [];
    },
  },
});
export const hook1Store = defineStore('hook1', {
  state: (): HookState => ({
    id: 0,
    // 摆动角度
    angle: 0,
    // 1 顺 -1 逆
    direction: 1,
    // 0 不变 1 伸长 -1 收回
    extend: 0,
    // 长度
    length: 0,
    // 被抓住的矿物
    mineral: null,
    score: 0,
    // 个人积分
    x: 0,
    y: 0,
  }),
  actions: {
    reset(index: number, people: number) {
      this.angle = 0;
      this.direction = 1;
      this.extend = 0;
      this.length = HOOKLENGTH;
      this.mineral = null;
      this.score = 0;
      this.x = MINERPOS[index + people - 1] + SKYLEFT;
      this.y = -HOOKHEIGHT;
    },
  },
});
export const hook2Store = defineStore('hook2', {
  state: (): HookState => ({
    id: 1,
    angle: 0,
    direction: 1,
    extend: 0,
    length: 0,
    mineral: null,
    score: 0,
    x: 0,
    y: 0,
  }),
  actions: {
    reset(index: number, people: number) {
      this.angle = 0;
      this.direction = 1;
      this.extend = 0;
      this.length = HOOKLENGTH;
      this.mineral = null;
      this.score = 0;
      this.x = MINERPOS[index + people - 1] + SKYLEFT;
      this.y = -HOOKHEIGHT;
    },
  },
});

const pinia = createPinia();

pinia.use(piniaPersist);
export default pinia;
