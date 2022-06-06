const targetList: number[] = [650, 1195, 2010, 3095, 4450, 6075, 10135, 12570, 15275];

const targetCreator = (index: number): number => {
  const len = targetList.length;
  const last = targetList[len - 1];
  return index <= len ? targetList[index - 1] : (last + (index - len) * 2705);
};

export default targetCreator;
