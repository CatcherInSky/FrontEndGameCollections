import { MineralsType, MineralsEnum } from '@/types';
// 基本常量
export const MISSIONNUMS = 2;
export const TIME = 1000;
export const WIDTH = 1200;
export const HEIGHT = 900;
export const SKYHEIGHT = 180;
export const GROUNDHEIGHT = HEIGHT - SKYHEIGHT;
export const SKYLEFT = 200;
export const SKYRIGHT = 200;
// 矿工宽高
export const MINERSIZE = [80, 100];
// 矿工位置
// 1 单人居中 2 双人左 3 双人右
export const MINERPOS = [400, 350, 450];
// 钩子宽度
export const HOOKWIDTH = 2;
// 钩子头离地高度
export const HOOKHEIGHT = 20;
// 钩子头尺寸
export const HOOKRADIUS = 10;
// 初始钩子长度
export const HOOKLENGTH = 60;
// 钩子速度
export const NORMALSPEED = 1;
// 钩子夹角
export const HOOKANGLE = 60;
// 帧数
export const FRAME = 120;
//  爆炸范围
export const EXPLODERANGE = 500;
// 老鼠速度
export const RATSPEED = 1;

// 黄金 越大越慢
export const gold1: MineralsType = {
  radius: 30 / 2,
  worth: 100,
  speed: 1,
  type: MineralsEnum.GOLD,
};

export const gold2: MineralsType = {
  radius: 60 / 2,
  worth: 30,
  speed: 2,
  type: MineralsEnum.GOLD,
};
export const gold3: MineralsType = {
  radius: 150 / 2,
  worth: 30,
  speed: 2,
  type: MineralsEnum.GOLD,
};

export const rock1: MineralsType = {
  radius: 60 / 2,
  worth: 3,
  speed: 1,
  type: MineralsEnum.ROCK,
};
export const rock2: MineralsType = {
  radius: 90 / 2,
  worth: 3,
  speed: 1,
  type: MineralsEnum.ROCK,
};

// 炸药桶碰到爆炸，只剩桶盖
export const explosive1: MineralsType = {
  radius: 100,
  worth: 3,
  speed: 1,
  type: MineralsEnum.EXP1,
};
// 桶盖
export const explosive2: MineralsType = {
  radius: 0,
  worth: 1,
  speed: 1,
  type: MineralsEnum.EXP2,
};
// 在一定范围内活动
export const rat1: MineralsType = {
  radius: 10,
  worth: 2,
  speed: 1,
  type: MineralsEnum.RAT1,
};
// 带钻石的老鼠
export const rat2: MineralsType = {
  radius: 10,
  worth: 602,
  speed: 1,
  type: MineralsEnum.RAT2,
};
// 随机速度/给钱/给Buff/给炸药
export const unknown: MineralsType = {
  radius: 30,
  worth: 0,
  speed: 1,
  type: MineralsEnum.UN,
};
