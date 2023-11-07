import isDate from '../src/isDate.js';
const { toBe, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

describe('isDate', () => {
  test('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
  });

  test('should return false for non-Date objects', () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate(123)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  test('should return false for Date-like strings', () => {
    expect(isDate('2022-01-01')).toBe(false);
  });
});