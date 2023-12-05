import isEmpty from '../src/isEmpty.js';
import 'jest-extended';
import 'jest-chain';

describe('isEmpty', () => {
  test('should return true for null and undefined input', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return true for non-object-like input', () => {
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(1)).toBe(true)
  });

  test('should return true for empty array-like objects', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(Symbol())).toBe(true);
  });
  
  test('should return false for non-empty array-like objects', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty('abc')).toBe(false);
  });

  test('should return true for empty maps and sets', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });
  
  test('should return false for non-empty maps and sets', () => {
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  });
  
  test('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true);
  });
  
  test('should return false for non-empty objects', () => {
    expect(isEmpty({ 'a': 1 })).toBe(false);
  });
  
  test('should return true for empty buffer', () => {
    
    expect(isEmpty(new Buffer.alloc(0))).toBe(true)
  });

  test('should return false for nonempty buffer', () => {
    expect(isEmpty(Buffer.from('Hi!'))).toBe(false)
  });

  test('should return true for an prototype object with no own properties', () => {
    const objWithPrototype = Object.create({ a: 1 });
    expect(isEmpty(objWithPrototype)).toBe(true);
  });

  test('should return false for an prototype object with own properties', () => {
    const objWithOwnProps = Object.create({ a: 1 });
    objWithOwnProps.b = 2;
    expect(isEmpty(objWithOwnProps)).toBe(false);
  });

});