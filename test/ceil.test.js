import ceil from '../src/ceil.js';
const { toBeGreaterThan, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

describe('ceil', () => {
  test('should round up to the nearest whole number', () => {
    expect(ceil(4.001)).toBe(5);
    expect(ceil(4.999)).toBe(5);
    expect(ceil(-4.001)).toBe(-4);
    expect(ceil(-4.999)).toBe(-4);
  });

  test('should round up to the specified precision', () => {
    expect(ceil(6.001, 2)).toBe(6.01);
    expect(ceil(6.009, 2)).toBe(6.01);
    expect(ceil(-6.011, 2)).toBe(-6.01);
    expect(ceil(-6.019, 2)).toBe(-6.01);
  });

  test('should round up to the nearest 10, 100, 1000, etc when precision is negative', () => {
    expect(ceil(6001, -2)).toBe(6100);
    expect(ceil(6099, -2)).toBe(6100);
    expect(ceil(-6101, -2)).toBe(-6100);
    expect(ceil(-6199, -2)).toBe(-6100);
  });

  test('should return the number itself when it is a whole number', () => {
    expect(ceil(5)).toBe(5);
    expect(ceil(5.000)).toBe(5);
    expect(ceil(-5)).toBe(-5);
    expect(ceil(-5.000)).toBe(-5);
  });

  test('should return NaN when the input is not a number', () => {
    expect(ceil('abc')).toBeNaN();
  });

  test('should handle zero correctly', () => {
    expect(ceil(0)).toBe(0);
    expect(ceil(0.00)).toBe(0);
    expect(ceil(0, 2)).toBe(0);
    expect(ceil(0, -2)).toBe(0);
  });
});