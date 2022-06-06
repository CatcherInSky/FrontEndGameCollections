import {
  HookState, MissionState, MineralsObject,
  MineralsEnum,
  ItemsEnum,
} from '@/types';
/* eslint-disable no-param-reassign */
import { storeToRefs } from 'pinia';
import {
  missionStore, userStore, hook1Store, hook2Store,
} from '@/store';
import { hit, limit, distance } from '@/utils/math';
import {
  FRAME, HOOKLENGTH, EXPLODERANGE, RATSPEED,
  explosive2,
  HOOKANGLE,
  NORMALSPEED,
} from '@/consts';
import { Ref } from 'vue';

const countdown = (missionState: MissionState) => {
  missionState.time -= (1 / FRAME);
};
const swing = (hookState: HookState) => {
  const { angle, direction } = hookState;
  if (angle > HOOKANGLE) {
    hookState.direction = -1;
  } else if (angle < -HOOKANGLE) {
    hookState.direction = 1;
  }
  hookState.angle += direction * 0.5;
};
const hasRat = (minerals: MineralsObject[]) => minerals
  .findIndex(({ type }) => type === MineralsEnum.RAT1 || type === MineralsEnum.RAT2) !== -1;
const ratsMove = (minerals:Ref< MineralsObject[]>) => {
  minerals.value = minerals.value.map((mineral) => {
    const { range, type } = mineral;
    let { x, direction } = mineral;
    if (
      (type === MineralsEnum.RAT1 || type === MineralsEnum.RAT2)
         && range) {
      if (x <= range[0]) {
        direction = 1;
      } else if (x >= range[1]) {
        direction = -1;
      }
    }
    x += (direction || 0) * RATSPEED;
    return {
      ...mineral,
      x,
      direction,
    };
  });
};
const explode = (index: number, missionState: MissionState) => {
  // 爆炸范围内GG
  const { minerals } = missionState;
  missionState.minerals = minerals
    .filter((mineral) => distance(minerals[index], mineral) > EXPLODERANGE);
};
const lottery = () => {
  console.log('大乐透');
};
const grasp = (index: number, hookState: HookState, missionState: MissionState) => {
  const { minerals } = missionState;
  console.log(`抓到第${index}个`);
  const captured = minerals[index];
  if (captured.type === MineralsEnum.EXP1) {
    // 抓住炸药桶触发爆炸
    explode(index, missionState);
    // 爆炸后拿住桶盖
    hookState.mineral = {
      x: 0,
      y: 0,
      ...explosive2,
    };
  } else if (captured.type === MineralsEnum.UN) {
    // todo: 抓住未知物随机速度
    captured.speed = [0.1, 0.5, 1, 2, 3][Math.floor(Math.random() * 5)];
    hookState.mineral = captured;
    missionState.minerals.splice(index, 1);
  } else {
    // 抓住矿物/骨头/老鼠
    hookState.mineral = captured;
    missionState.minerals.splice(index, 1);
  }
};
const grow = (hookState: HookState) => {
  // 抓到物品或者触及边界
  if (hookState.mineral || limit(hookState)) {
    hookState.extend = -1;
  } else {
    // 伸出速度固定
    hookState.length += hookState.extend * NORMALSPEED;
  }
};
const settle = (hookState: HookState, missionState: MissionState) => {
  const { mineral } = hookState;
  const { buffs } = missionState;
  let times = 1;
  if (mineral?.type === MineralsEnum.UN) {
    // ItemsEnum.LUCK
    // 结算布袋
    lottery();
    times = 0;
  } else if (mineral?.type === MineralsEnum.ROCK && buffs.includes(ItemsEnum.POW)) {
    times = 3;
  } else if (mineral?.type === MineralsEnum.DIAMOND && buffs.includes(ItemsEnum.DIC)) {
    times = 3;
  } else if (mineral?.type === MineralsEnum.RAT2 && buffs.includes(ItemsEnum.DIC)) {
    times = 3;
    // 减去两倍老鼠价值
    missionState.score -= 2;
  }
  const score = (mineral?.worth || 0) * times;
  missionState.score += score;
  hookState.score += score;
  hookState.mineral = null;
};

const shrink = (hookState: HookState, missionState: MissionState) => {
  const {
    mineral, length, extend,
  } = hookState;
  if (length < HOOKLENGTH) {
    hookState.extend = 0;
    settle(hookState, missionState);
  } else {
    const { buffs } = missionState;
    // 收回速度取决于抓住的物品+buff
    hookState.length += mineral
      ? extend * mineral.speed * (buffs.includes(ItemsEnum.POW) ? 2 : 1) : extend;
  }
};
export default (fn: () => void) => {
  const hookList = [hook1Store(), hook2Store()];
  const userState = userStore();
  const missionState = missionStore();
  const { minerals } = storeToRefs(missionState);
  const hooks = Array.from({
    length: userState.people,
  }, (_, index) => hookList[index]);
  let doRatsMove = hasRat(minerals.value);
  return setInterval(() => {
    // 倒数结束
    if (missionState.time <= 0) {
      fn();
    }
    hooks.forEach((hook) => {
      if (hook.extend > 0) {
        // 伸长过程
        // 碰撞检测
        const index = hit(
          // 起点 角度 长度
          hook,
          // 目标
          minerals.value,
        );
        if (index !== -1) {
          grasp(index, hook, missionState);
          // 抓完看看还有没有老鼠
          doRatsMove = hasRat(minerals.value);
        }
        grow(hook);
      } else if (hook.extend < 0) {
        // 回收过程
        shrink(hook, missionState);
      } else {
      // 摆动过程
        swing(hook);
      }
    });
    if (doRatsMove) ratsMove(minerals);
    countdown(missionState);
  }, 1000 / FRAME);
};
