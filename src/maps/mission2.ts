import {
  gold1, gold2, rock1, explosive1, rat2,
} from '@/consts';
import { MineralsObject } from '@/types';

const goldList:MineralsObject[] = [
  {
    x: 300,
    y: 100,
    ...rock1,
  },
  {
    x: 500,
    y: 500,
    ...gold2,
  },
];

const rockList:MineralsObject[] = [
  {
    x: 400,
    y: 600,
    ...rock1,
  },
];

const explosiveList:MineralsObject[] = [
  {
    x: 1000,
    y: 400,
    ...explosive1,
  },
];

const ratList:MineralsObject[] = [
  {
    x: 1000,
    y: 100,
    direction: 1,
    range: [600, 900],
    ...rat2,
  },
];

export default {
  target: 20,
  minerals: [...goldList, ...rockList, ...explosiveList, ...ratList].map((item, index) => ({
    ...item,
    id: index,
  })),
};
