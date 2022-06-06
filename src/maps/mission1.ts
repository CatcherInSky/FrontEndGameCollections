import {
  gold1, gold2, gold3, rock1, explosive1, rat2, rock2, unknown,
} from '@/consts';
import { MineralsObject } from '@/types';

const goldList:MineralsObject[] = [
  ...[
    { x: 237, y: 116 },
    { x: 402, y: 255 },
    { x: 1008, y: 180 },
    { x: 948, y: 255 },
    { x: 953, y: 321 },
  ].map((item) => ({
    ...item,
    ...gold1,
  })),

  ...[
    { x: 285, y: 560 },
    { x: 528, y: 490 },
    { x: 729, y: 270 },
  ].map((item) => ({
    ...item,
    ...gold2,
  })),

  ...[
    { x: 150, y: 375 },
    { x: 1100, y: 450 },
  ].map((item) => ({
    ...item,
    ...gold3,
  })),
];

const rockList:MineralsObject[] = [
  ...[
    { x: 150, y: 225 },
    { x: 1029, y: 114 },
  ].map((item) => ({
    ...item,
    ...rock1,
  })),
  ...[
    { x: 417, y: 630 },
    { x: 900, y: 417 },
  ].map((item) => ({
    ...item,
    ...rock2,
  })),
];

const unknownList = [{
  x: 807,
  y: 644,
  ...unknown,
}];

export default [...goldList, ...rockList, ...unknownList].map<MineralsObject>((item, index) => ({
  ...item,
  id: index,
}));
