import {sum} from './utils';

describe('isCorrectSum', () => {
  it('sum is 6', () => {
    const summedValue = sum([1, 2, 3]);
    expect(summedValue).toBe(6);
  });
  it('sum is 100', () => {
    const summedValue = sum([100]);
    expect(summedValue).toBe(100);
  });
  it('sum is 0 with empty array', () => {
    const summedValue = sum([]);
    expect(summedValue).toBe(0);
  });
  it('sum is 0', () => {
    const summedValue = sum([0]);
    expect(summedValue).toBe(0);
  });
});
