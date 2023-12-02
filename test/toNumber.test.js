import toNumber from '../src/toNumber.js';
import 'jest-extended';
import 'jest-chain';


/**
 * Equivalence classes:
 * 1. Value is number
 * 2. Value is symbol
 * 3. Value is object
 *  - With valueOf method that returns string that can be 
 *    converted to number
 *  - With valueOf method that returns another object
 *  - Without value of method
 * 4. Value is string that can be converted to a number
 * 5. Value is string that cannot be converted to a number
 * 6. Value is string representing a binary number
 * 7. Value is string representing an octal number
 * 8. Value is string representing a hexadecimal number
 * 9. Value is null or undefined
 * 10. Value is boolean
 */

describe('toNumber', () => {
  test('should return the number when value is a number', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    expect(toNumber(Number.MAX_VALUE)).toBe(1.7976931348623157e+308);
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });

  test('should return NaN when value is a symbol', () => {
    expect(toNumber(Symbol('symbol'))).toBeNaN();
  });

  test('should handle objects with valueOf method', () => {
    expect(toNumber({ valueOf: () => '3.2' })).toBe(3.2);
  });

  test('should handle objects without valueOf method', () => {
    expect(toNumber({})).toBeNaN();
  });

  test('should handle objects with valueOf method returning another object', () => {
    const obj = {
      valueOf: () => ({ foo: 'bar' }),
    };
    expect(toNumber(obj)).toBeNaN();
  });

  test('should handle objects where valueOf is not a function', () => {
    const obj = {
      valueOf: 'not a function',
    };
    expect(toNumber(obj)).toBeNaN();
  });

  test('should handle boolean values', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('should handle null and undefined', () => {
    expect(toNumber(null)).toBe(0); // is null 0?
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(NaN)).toBeNaN();
  });

  test('should convert string value to a number', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber('0b10')).toBe(2);
    expect(toNumber('0o10')).toBe(8);
    expect(toNumber('-0x1')).toBeNaN();
    expect(toNumber('')).toBe(0);
    expect(toNumber(' ')).toBe(0);
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

  test('should handle BigInt values', () => {
    const bigInt = BigInt(0);
    expect(toNumber(bigInt)).toBe(0);
  });

  test('should handle objects with custom toString methods', () => {
    expect(toNumber({ toString: () => '3.2' })).toBe(3.2);
    expect(toNumber({ toString: () => 'abc' })).toBeNaN();
  });
});