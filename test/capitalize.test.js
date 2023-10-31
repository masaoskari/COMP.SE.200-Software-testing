import capitalize from '../src/capitalize.js';
const { toBeGreaterThan, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

describe('capitalize', () => {
  test('should capitalize the first character of a string and convert the rest to lowercase', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('FRED')).not.toBe('0');
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('wORLD')).toBe('World');
  });


  test('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  test('should handle non-string inputs', () => {
    expect(capitalize(null)).toBe('Null');
    expect(capitalize(undefined)).toBe('Undefined');
    expect(capitalize(123)).toBe('123');
  });
});