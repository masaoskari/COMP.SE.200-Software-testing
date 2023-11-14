import toNumber from '../src/toNumber.js';
import 'jest-extended';
import 'jest-chain';


/**
 * Equivalence classes:
 * 1. Value is number
 * 2. Value is symbol
 * 3. Value is object
 * 4. Value is string that can be converted to a number
 * 5. Value is string that cannot be converted to a number
 * 6. Value is string representing a binary number
 * 7. Value is string representing an octal number
 * 8. Value is string representing a hexadecimal number
 * 9. Value is null or undefined
 * 10. Value is boolean
 * 11. Value is 
 */

describe('toNumber', () => {
  test('should return the number when value is a number', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    expect(toNumber(Number.MAX_VALUE)).toBe(1.7976931348623157e+308);
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });

  test('should return NaN when value is a symbol', () => {
    expect(toNumber(Symbol('symbol'))).toBeNaN();
  });

  test('should convert object value to a number', () => {
    //expect(toNumber({ 'a': 3.2 })).toBe(3.2);
    expect(toNumber({ valueOf: () => '3.2' })).toBe(3.2);
    expect(toNumber({})).toBeNaN();
  });

  test('should convert string value to a number', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber(' 3.2 ')).toBe(3.2);
    expect(toNumber('0b10')).toBe(2);
    expect(toNumber('0o10')).toBe(8);
    expect(toNumber('-0x1')).toBeNaN();
    expect(toNumber('')).toBe(0);
    expect(toNumber(' ')).toBe(0);
  });

  test('should convert non-string and non-object value to a number', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('should handle large numbers', () => {
    expect(toNumber('1e+1000')).toBe(Infinity);
    expect(toNumber('-1e+1000')).toBe(-Infinity);
  });

  test('should handle non-numeric strings', () => {
    expect(toNumber('abc')).toBeNaN();
    expect(toNumber(' ')).toBe(0);
  });

  test('should handle arrays', () => {
    expect(toNumber([1])).toBe(1);
    expect(toNumber([1, 2])).toBeNaN();
    expect(toNumber([])).toBe(0);
  });

  test('should handle functions', () => {
    expect(toNumber(() => {})).toBeNaN();
  });

  test('should handle objects with custom toString methods', () => {
    expect(toNumber({ toString: () => '3.2' })).toBe(3.2);
    expect(toNumber({ toString: () => 'abc' })).toBeNaN();
  });

  test('toNumber should return NaN when valueOf returns non-numeric value', () => {
    const obj = {
      valueOf: () => 'not a number'
    };
    expect(toNumber(obj)).toBeNaN();
  });
});