import memoize from '../src/memoize.js';
import 'jest-extended';
import 'jest-chain';


describe('memoize tests', () => {

  test('should throw TypeError if func is not a function', () => {
    expect(() => {
      memoize('not a function');
    }).toThrow(TypeError);
  });

  test('should throw TypeError if resolver is not a function', () => {
    const func = jest.fn((n) => n * 2);
    expect(() => {
      memoize(func, 'not a function');
    }).toThrow(TypeError);
  });

  test('should memoize function results and set cache', () => {
    const values = jest.fn((obj) => Object.values(obj));
    const memoizedValues = memoize(values);

    const object = { 'a': 1, 'b': 2 };
    const other = { 'c': 3, 'd': 4 };

    // Call the memoized function
    const result1 = memoizedValues(object);
    const result2 = memoizedValues(other);

    // Check that the results are correct
    expect(result1).toEqual([1, 2]);
    expect(result2).toEqual([3, 4]);

    // Check that the cache is set
    expect(memoizedValues.cache.get(object)).toEqual([1, 2]);
    expect(memoizedValues.cache.get(other)).toEqual([3, 4]);
  });

  test('should return manually modified cache value when called with the same argument', () => {
    const values = jest.fn((obj) => Object.values(obj));
    const memoizedValues = memoize(values);

    const object = { 'a': 1, 'b': 2 };

    // Call the memoized function
    memoizedValues(object);

    // Manually modify the cache
    memoizedValues.cache.set(object, ['a', 'b']);

    // Call the memoized function again
    const result = memoizedValues(object);

    // Check that the result is the manually set cache value
    expect(result).toEqual(['a', 'b']);
  });

  test('should memoize the result of a basic function', () => {
    const func = jest.fn((x) => x * 2);
    const memoizedFunc = memoize(func);

    expect(memoizedFunc(2)).toBe(4);
    expect(memoizedFunc(2)).toBe(4);
    expect(func).toHaveBeenCalledTimes(1);
    // Check that cache exists
    expect(memoizedFunc.cache.get(2)).toBe(4);
  });

  test('should use a resolver function to determine the cache key', () => {
    const func = jest.fn((x) => x * 2);
    const resolver = jest.fn((x) => `key:${x}`);
    const memoizedFunc = memoize(func, resolver);

    expect(memoizedFunc(2)).toBe(4);
    expect(memoizedFunc(2)).toBe(4);
    expect(func).toHaveBeenCalledTimes(1);
    expect(resolver).toHaveBeenCalledTimes(2);
  });


  test('should allow memoize.Cache to be replaced', () => {
    const originalCache = memoize.Cache;
    memoize.Cache = WeakMap;
  
    // Test that modified cache works
    const func = jest.fn((x) => x * 2);
    const memoizedFunc = memoize(func);
    
    // WeakMap allow only objects as keys
    const key = {};
    const result1 = memoizedFunc(key);
    expect(result1).toBe(key * 2);

    expect(memoizedFunc.cache instanceof WeakMap).toBe(true);
  
    memoize.Cache = originalCache;
  });


  test('should handle cache key collision', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);
  
    const result1 = memoizedAdd(1, 2);  // 3
    const result2 = memoizedAdd(1, 3);  // Expected 4, but will return 3 due to cache key collision
  
    expect(result1).toBe(3);
    expect(result2).toBe(4);  // This test will fail
  });

  test('should assign new Map to memoized.cache if memoize.Cache is not set', () => {
    const func = jest.fn();
    const memoizedFunc = memoize(func);
  
    expect(memoizedFunc.cache).toBeInstanceOf(Map);
  });

});