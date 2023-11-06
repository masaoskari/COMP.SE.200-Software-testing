import capitalize from '../src/capitalize.js';
const { toBeGreaterThan, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

/**
 * Equivalence classes:
 * 1. String is already capitalized
 * 2. String is all lowercase
 * 3. String is all uppercase
 * 4. String starts with a non-alphabetic character
 * 5. String contains special characters
 * 6. String contains Unicode characters
 * 7. String is empty
 * 8. String is null or undefined
 * 9. String is a number
 * 10. Sting contans a mix of alphabetic, special, and Unicode characters
 * 
 * Edge conditions:
 * 1. String contains only one character
 * 2. String contains only special characters or Unicode characters
 * 3. String contains a mix of alphabetic, special, and Unicode characters
 * 
 */

describe('capitalize', () => {
  test('should capitalize the first character of a string and convert the rest to lowercase', () => {
    expect(capitalize('Fred')).toBe('Fred');
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('wORLD')).toBe('World');
  });

  test('should handle language (finnish / Swedish / greek) specific characters', () => {
    expect(capitalize('αlpha')).toBe('Αlpha');
    expect(capitalize('παλημέρα')).toBe('Παλημέρα');
    expect(capitalize('åÖÖääÄÄ')).toBe('Åööääää');
  });

  test('should correctly capitalize strings with multibyte characters', () => {
    expect(capitalize('ßtrasse')).toBe('SStrasse');
  });

  test('should correctly handle strings that start with a non-alphabetic character', () => {
    expect(capitalize('123ABc')).toBe('123abc');
    expect(capitalize('/(¤#)ABc')).toBe('/(¤#)abc');
  });

  test('should handle empty one character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  test('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  test('should handle non-string inputs', () => {
    expect(capitalize(null)).toBe('Null');
    expect(capitalize(undefined)).toBe('Undefined');
    expect(capitalize(123)).toBe('123');
  });

  test('should correctly handle strings that start with a whitespace', () => {
    expect(capitalize(' hello')).toBe(' hello');
  });

  test('should correctly handle strings that contain special characters', () => {
    expect(capitalize('hello-%&//()=?!"#world')).toBe('Hello-%&//()=?!"#world');
  });

  test('should correctly handle strings that contain Unicode characters', () => {
    // \u00D6 = Ö
    // \u00F6 = ö
    expect(capitalize('hello\u00D6')).toBe('Hello\u00F6');
    expect(capitalize('\u00F6hello')).toBe('Öhello');
    expect(capitalize('\u00F6hello')).toBe('\u00D6hello');
  });

  test('should correctly handle strings that contain only Unicode or special characters', () => {
    expect(capitalize('¤&#%')).toBe('¤&#%');
    expect(capitalize('\u00F6')).toBe('Ö');
  });

  test('should correctly handle strings that contain a mix of alphabetic, special, and Unicode characters', () => {
    expect(capitalize('\u00D6\\\u00F6&&HELLO')).toBe('Ö\\ö&&hello');
  });
  
});
