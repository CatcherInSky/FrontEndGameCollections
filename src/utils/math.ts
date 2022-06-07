import {
  MineralsObject, Locate, Hook, HookState,
} from '@/types';
import {
  WIDTH, GROUNDHEIGHT, HOOKRADIUS,
} from '@/consts';
import * as math from 'mathjs';

export const trace = (hook: Hook): Locate => {
  const {
    angle, length, x, y,
  } = hook;

  return {
    x: math.evaluate(`${x} - ${length} * sin(${angle} deg)`),
    y: math.evaluate(`${length} * cos(${angle} deg)`) + y,
  };
};
export const distance = (obj1:Locate, obj2: Locate) => math.evaluate(`sqrt((${obj1.x} - ${obj2.x}) ^ 2 + (${obj1.y} - ${obj2.y}) ^ 2)`);

// 命中判定
export const hit = (hook: HookState, minerals: MineralsObject[]) => minerals
  .filter(() => true)
  // todo: 如何简化计算？
  .findIndex(
    ({
      radius, x, y,
    }) => (distance(trace(hook), { x, y }) - radius - HOOKRADIUS) < 1,
  );

export const limit = (hook: HookState): boolean => {
  const {
    angle, length, x, y,
  } = hook;

  const cos = math.evaluate(`abs(${length} * cos(${angle} deg))`);
  const sin = math.evaluate(`abs(${length} * sin(${angle} deg))`);

  return cos >= (GROUNDHEIGHT - y) || sin >= (angle > 0 ? x : (WIDTH - x));
};
