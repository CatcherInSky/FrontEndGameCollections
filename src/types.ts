/* eslint-disable no-shadow */
export enum MineralsEnum {
    GOLD = 'gold',
    ROCK = 'rock',
    // 钻石
    DIAMOND = 'diamond',
    // 炸药桶
    EXP1 = 'explosiveBucket',
    // 桶盖
    EXP2 = 'explosive2',
    // 普通老鼠
    RAT1 = 'rat1',
    // 钻石老鼠
    RAT2 = 'rat2',
    // 布袋
    UN = 'unknown',
}

export enum ItemsEnum {
    // 炸药
    POD = 'powder',
    // 生力水
    POW = 'power',
    // 石头收藏书
    ROC = 'collect1',
    // 钻石收藏书
    DIC = 'collect2',
    // 幸运草
    LUCK = 'luck'
}

export interface Locate {
    x: number,
    y: number,
}

export type Hook = {
    angle: number, length: number
} & Locate

export interface MineralsType {
    radius: number,
    worth: number,
    speed: number,
    type: string
}

export type MineralsObject = MineralsType & Locate & {
    id?: number,
    // 老鼠初始方向
    direction?: 1| -1
    // 老鼠活动范围
    range?: number[]
}

// store
export interface UserState {
    highest: number,
    score: number,
    powder: number,
    mission: number,
    people: 1 | 2,
}
export interface MissionState {
    score: number,
    time: number,
    powder: number,
    buffs: any[],
    target: number,
    minerals: MineralsObject[],
}
export interface HookState {
    id: number,
    angle: number,
    direction: 1 | -1,
    extend: 0 | 1 | -1,
    length: number,
    mineral: null | MineralsObject,
    score: number,
    x: number,
    y: number,
}
