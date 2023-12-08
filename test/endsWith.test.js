import endsWith from '../src/endsWith.js';
import 'jest-extended';
import 'jest-chain';

/**
 * Equivalence classes:
 * 1. String ends with target
 * 2. String does not end with target
 * 3. Position is less than string length and string ends with target at position
 * 4. Position is less than target length
 * 5. Position is negative or not a number
 * 6. Target is null or undefined
 * 6. Target is empty string
 */

describe('endsWith', () => {
  test('should return true when string ends with target', () => {
    expect(endsWith('abc', 'c')).toBe(true).toBeBoolean();
  });

  test('should return false when string does not end with target', () => {
    expect(endsWith('abc', 'b')).toBe(false).toBeBoolean();
  });

  test('should return true when position is less than string length and string ends with target at position', () => {
    expect(endsWith('abc', 'b', 2)).toBe(true).toBeBoolean();
    expect(endsWith('abc', 'a', 1)).toBe(true).toBeBoolean();
  });

  test('should return false when position is less than target length', () => {
    expect(endsWith('abc', 'abc', 2)).toBe(false).toBeBoolean();
  });

  test('should return false when position is less than target length and string is not ending with target at position', () => {
    expect(endsWith('abc', 'b', 1)).toBe(false).toBeBoolean();
  });

  test('should return true when position is greater than string length and string ends with target', () => {
    expect(endsWith('abc', 'c', 4)).toBe(true).toBeBoolean();
  });

  test('should treat the position as the string`s length when position is not a number or negative', () => {
    expect(endsWith('abc', 'a', -1)).toBe(false).toBeBoolean();
    expect(endsWith('abc', 'a', 'test')).toBe(false).toBeBoolean();
  });


  test('should return false when the second argument is null or undefined', () => {
    expect(endsWith('abc', null)).toBe(false).toBeBoolean();
    expect(endsWith('', undefined)).toBe(false).toBeBoolean();
  });

  test('should handle edge cases', () => {
    expect(endsWith('abc', '')).toBe(true);
    expect(endsWith('', 'a')).toBe(false);
    expect(endsWith('', '')).toBe(true);
  });

});