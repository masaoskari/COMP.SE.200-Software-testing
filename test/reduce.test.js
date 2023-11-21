import reduce from '../src/reduce.js';
import 'jest-extended';
import 'jest-chain';

describe('reduce', () => {
  test('should reduce an array to a single value', () => {
    expect(reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    expect(reduce([1, 2], (sum, n) => sum + n, 1)).toBe(4);
  });

  test('should use the first element of an array as the initial value when no accumulator is provided', () => {
    expect(reduce([1, 2, 3], (sum, n) => sum + n)).toBe(6);
  });

  test('should reduce an object to a single value', () => {
    const object = { 'a': 1, 'b': 2, 'c': 1 };
    const iteratee = (result, value, key) => {
      (result[value] || (result[value] = [])).push(key);
      return result;
    };
    expect(reduce(object, iteratee, {})).toEqual({ '1': ['a', 'c'], '2': ['b'] });
  });

  test('should handle empty collections', () => {
    expect(reduce([], (sum, n) => sum + n, 0)).toBe(0);
    expect(reduce({}, (result, value, key) => result, {})).toEqual({});
    expect(reduce([], (sum, n) => sum + n, 10)).toBe(10);
    expect(reduce({}, (result, value, key) => result, { 'a': 1 })).toEqual({ 'a': 1 });
  });

});