import memoize from '../src/memoize.js';
import 'jest-extended';
import 'jest-chain';


describe('memoize', () => {
  test('should memoize the result of a function', () => {
    const func = jest.fn((x) => x * 2);
    const memoizedFunc = memoize(func);

    expect(memoizedFunc(2)).toBe(4);
    expect(memoizedFunc(2)).toBe(4);
    expect(func).toHaveBeenCalledTimes(1);
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

  test('should throw an error if func or resolver is not a function', () => {
    expect(() => memoize('not a function')).toThrow('Expected a function');
    expect(() => memoize(() => {}, 'not a function')).toThrow('Expected a function');
  });

  test('should allow the cache to be modified', () => {
    const func = (x) => x * 2;
    const memoizedFunc = memoize(func);

    expect(memoizedFunc(2)).toBe(4);
    memoizedFunc.cache.set(2, 8);
    expect(memoizedFunc(2)).toBe(8);
  });

  test('should allow memoize.Cache to be replaced', () => {
    const originalCache = memoize.Cache;
    memoize.Cache = WeakMap;

    const func = (x) => x * 2;
    const memoizedFunc = memoize(func);

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

  test('should handle asynchronous functions', async () => {
    const asyncAdd = async (a, b) => a + b;
    const memoizedAsyncAdd = memoize(asyncAdd);
  
    const result1 = await memoizedAsyncAdd(1, 2);  // 3
    const result2 = await memoizedAsyncAdd(1, 2);  // Expected 3, but will return a new Promise
  
    expect(result1).toBe(3);
    expect(result2).toBe(3);  // This test will fail
  });

  test('should handle external modification of the cache', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);
  
    const result1 = memoizedAdd(1, 2);  // 3
    memoizedAdd.cache.set('1,2', 4);  // Modify the cache externally
    const result2 = memoizedAdd(1, 2);  // Expected 3, but will return 4 due to external cache modification
  
    expect(result1).toBe(3);
    expect(result2).toBe(3);  // This test will fail
  });

  test('should handle non-primitive cache keys', () => {
    const identity = (x) => x;
    const memoizedIdentity = memoize(identity);
  
    const key1 = [1, 2];
    const key2 = [1, 2];
    const result1 = memoizedIdentity(key1);  // [1, 2]
    const result2 = memoizedIdentity(key2);  // Expected [1, 2], but will compute a new result
  
    expect(result1).toBe(key1);
    expect(result2).toBe(key1);  // This test will fail
  });
});