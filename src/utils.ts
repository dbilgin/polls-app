export const sum = (obj: number[]) => {
  let finalSum = 0;
  for (const el of obj) {
    finalSum += el;
  }
  return finalSum;
};
