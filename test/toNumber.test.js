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
    expect(toNumber(3.2)).toBe(3.2).toBeNumber();
    expect(toNumber(6)).toBe(6).toBeNumber();
    expect(toNumber(0)).toBe(0).toBeNumber();
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324).toBeNumber();
    expect(toNumber(Number.MAX_VALUE)).toBe(1.7976931348623157e+308).toBeNumber();
    expect(toNumber(Infinity)).toBe(Infinity).toBeNumber();
    expect(toNumber(-Infinity)).toBe(-Infinity).toBeNumber();
  });

  test('should return NaN when value is a symbol', () => {
    expect(toNumber(Symbol('symbol'))).toBeNaN();
  });

  test('should handle objects with valueOf method', () => {
    expect(toNumber({ valueOf: () => '3.2' })).toBe(3.2).toBeNumber();
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
    expect(toNumber(true)).toBe(1).toBeNumber();
    expect(toNumber(false)).toBe(0);
  });

  test('should handle null and undefined', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(NaN)).toBeNaN();
  });

  test('should convert string value to a number', () => {
    expect(toNumber('3.2')).toBe(3.2).toBeNumber();
    expect(toNumber('0b10')).toBe(2).toBeNumber();
    expect(toNumber('0o10')).toBe(8).toBeNumber();
    expect(toNumber('-0x1')).toBeNaN();
    expect(toNumber('')).toBe(0).toBeNumber();
    expect(toNumber(' ')).toBe(0).toBeNumber();
  });

  test('should handle large numbers', () => {
    expect(toNumber('1e+1000')).toBe(Infinity).toBeNumber();
    expect(toNumber('-1e+1000')).toBe(-Infinity).toBeNumber();
  });

  test('should handle non-numeric strings', () => {
    expect(toNumber('abc')).toBeNaN();
    expect(toNumber(' ')).toBe(0);
  });

  test('should handle arrays', () => {
    expect(toNumber([1])).toBe(1).toBeNumber();
    expect(toNumber([1, 2])).toBeNaN();
    expect(toNumber([])).toBe(0).toBeNumber();
  });

  test('should handle objects with custom toString methods', () => {
    expect(toNumber({ toString: () => '3.2' })).toBe(3.2).toBeNumber();
    expect(toNumber({ toString: () => 'abc' })).toBeNaN();
  });


  // For regex tests (not imported in module so we need to copy paste those
  // here).
  const reTrim = /^\s+|\s+$/g;
  const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  const reIsBinary = /^0b[01]+$/i;
  const reIsOctal = /^0o[0-7]+$/i;
  
  test('reTrim should match leading and trailing whitespace', () => {
    expect(reTrim.test('   leading')).toBe(true);
    expect(reTrim.test('trailing   ')).toBe(true);
    expect(reTrim.test('none')).toBe(false);
  });
  
  test('reIsBadHex should match bad signed hexadecimal string values', () => {
    expect(reIsBadHex.test('+0x1f')).toBe(true);
    expect(reIsBadHex.test('-0X1F')).toBe(true);
    expect(reIsBadHex.test('+0xabc')).toBe(true);
    expect(reIsBadHex.test('-0XABC')).toBe(true);
    expect(reIsBadHex.test('0x1f')).toBe(false);
  });
  
  test('reIsBinary should match binary string values', () => {
    expect(reIsBinary.test('0b1010')).toBe(true);
    expect(reIsBinary.test('0B1010')).toBe(true);
    expect(reIsBinary.test('1010')).toBe(false);
  });
  
  test('reIsOctal should match octal string values', () => {
    expect(reIsOctal.test('0o123')).toBe(true);
    expect(reIsOctal.test('0O123')).toBe(true);
    expect(reIsOctal.test('123')).toBe(false);
  });
  
});