import get from '../src/get.js';
import 'jest-extended';
import 'jest-chain';

/**
 * Equivalence classes:
 * 1. Object contains the specified path
 * 2. Object is not containing the specified path
 * 3. Path is a string
 * 4. Path is an array
 * 5. Path is neither a string nor an array
 * 6. Default value is provided
 * 7. Default value is not provided
 * 8. Object is null or undefined
 * 9. Path is null or undefined
 * 9. Result is object
 * 10 Result is array
 * 
 */

describe('get', () => {
  test('should get property value by string path', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3).toBeNumber();
  });

  test('should get property value from more complex object by string path', () => {
    const object = { 'a': [{ 'b': [{ 'c': '2'}, {'e': 4}, {'f': { 'g': 'h' }}]}] };
    expect(get(object, 'a[0].b[2].f.g')).toBe('h');
  });

  test('should get property value by array path', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, ['a', '0', 'b', 'c'])).toBe(3).toBeNumber();
  });

  test('should get property value from more complex object by array path', () => {
    const object = { 'a': [{ 'b': [{ 'c': '2'}, {'e': 4}, {'f': { 'g': 'h' }}]}] };
    expect(get(object, ['a', 0, 'b', 2, 'f', 'g'])).toBe('h');
  });

  test('should return default value for undefined resolved values', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a.b.c', 'default')).toBe('default');
  });

  test('should return default for null or undefined object if default parameter is given', () => {
    expect(get(null, 'a.b.c', 'default')).toBe('default');
    expect(get(undefined, 'a.b.c', 'default')).toBe('default');
    expect(get(null, 'a.b.c')).toBeUndefined();
  });

  test('should handle non-object values', () => {
    expect(get(3, 'a.b.c', 'default')).toBe('default');
    expect(get('abc', 1, 'default')).toBe('b');
    expect(get(3, 0, 'default')).toBe('default');
    expect(get(true, 0, 'default')).toBe('default');
  });

  test('should handle non-string and non-array paths', () => {
    const object = { '3': [{ 'b': { 'c': 3 } }] };
    expect(get(object, null, 'default')).toBe('default');
    expect(get(object, undefined, 'default')).toBe('default');
    expect(get(object, 3, 'default')).toStrictEqual([{ 'b': { 'c': 3 } }]);
  });

  test('should correctly handle complex paths that include escaped characters', () => {
    const object = { 'a': [{ 'b': { 'c': 3, 'd\\e': 4, 'f': { 'g': 5 } } }] };
    expect(get(object, 'a[0].b.d\\e', 'default')).toBe(4);
  });

  test('should return undefined when path does not exist and no default value is provided', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a.b.c')).toBeUndefined();
  });

  test('should handle invalid parameters', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get()).toBeUndefined();
    expect(get(object)).toBeUndefined();
    expect(get('a.b.c')).toBeUndefined();
    expect(get('default')).toBeUndefined();
    expect(get('a.b.c', 'default')).toBeUndefined();
  });

  test('should handle object when value is object', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a[0].b')).toEqual({ 'c': 3 });
  });

  test('should handle object when value is array', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a')).toEqual([{ 'b': { 'c': 3 } }]);
  });
});