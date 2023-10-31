import capitalize from '../src/capitalize.js';
// https://websitehurdles.com/jest-cannot-use-import-statement-error/
describe('capitalize', () => {
  it('should capitalize the first character of a string and convert the rest to lowercase', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('wORLD')).toBe('World');
  });

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle non-string inputs', () => {
    expect(capitalize(null)).toBe('Null');
    expect(capitalize(undefined)).toBe('Undefined');
    expect(capitalize(123)).toBe('123');
  });
});