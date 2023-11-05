import endsWith from '../src/endsWith.js';
const { toBe, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

/**
 * Equivalence classes:
 * 1. String ends with target
 * 2. String does not end with target
 * 3. Position is less than string length and string ends with target at position
 * 4. Position is less than target length
 */
describe('endsWith', () => {
  test('should return true when string ends with target', () => {
    expect(endsWith('abc', 'c')).toBe(true);
  });

  test('should return false when string does not end with target', () => {
    expect(endsWith('abc', 'b')).toBe(false);
  });

  test('should return true when position is less than string length and string ends with target at position', () => {
    expect(endsWith('abc', 'b', 2)).toBe(true);
  });

  test('should return false when position is less than target length', () => {
    expect(endsWith('abc', 'abc', 2)).toBe(false);
  });

  test('should return false when position is less than target length and string is not ending with target at position', () => {
    expect(endsWith('abc', 'b', 1)).toBe(false);
  });

  test('should return true when position is greater than string length and string ends with target', () => {
    expect(endsWith('abc', 'c', 4)).toBe(true);
  });

  // Are these valid? Bug for example: The endsWith function cannot handle negative or undefined positions.
  // in endsWith.js: row 27 position should be lenght instead of 0??
  test('should treat the position as the string`s length when position is not a number or negative', () => {
    expect(endsWith('abc', 'c', 'undefined')).toBe(true);
    excpect(endsWith('abc', 'c', -1)).toBe(true);
  });

  test('should handle edge cases', () => {
    expect(endsWith('abc', '')).toBe(true);
    expect(endsWith('', 'a')).toBe(false);
    expect(endsWith('', '')).toBe(true);
  });
});