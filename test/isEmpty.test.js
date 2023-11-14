import isEmpty from '../src/isEmpty.js';
const { toBeGreaterThan, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

describe('isEmpty', () => {
  test('should return true for null and undefined input', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return true for empty input', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(Symbol())).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  test('should return true for non-object-like input', () => {
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(1)).toBe(true)
  })

  test('should return false for nonempty object-like input', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty({ 'a': 1 })).toBe(false);
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false)
  });
});