import isDate from '../src/isDate.js';
import 'jest-extended';
import 'jest-chain';

describe('isDate', () => {
  test('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('Mon April 23 2012'))).toBe(true);
    expect(isDate(new Date(2022, 1, 1))).toBe(true);
    expect(isDate(new Date(2022, 1, 1))).toBe(true);
    expect(isDate(new Date('2022-01-01'))).toBe(true);
  });

  test('should return false for non-Date objects', () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate(123)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  test('should return false for February 29 in a non-leap year', () => {
    const date = new Date(2021, 1, 29);
    expect(isDate(date)).toBe(false);
  });
  
  test('should return false for April 31', () => {
    const date = new Date(2021, 3, 31);
    expect(isDate(date)).toBe(false);
  });
  
  test('should return false for invalid day', () => {
    const date = new Date(2021, 1, 50);
    expect(isDate(date)).toBe(false);
  });

  test('should return false for invalid month 13', () => {
    const date = new Date(2021, 13, 1);
    expect(isDate(date)).toBe(false);
  });
  
  test('should return false for invalid year', () => {
    const date = new Date(-2023, 1, 1);
    expect(isDate(date)).toBe(false);
  });

});

describe('isDate with nodeIsDate mocked', () => {
  // Mocking nodeTypes.js isDate so that we can cover
  // all the cases in isDate function.
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../src/.internal/nodeTypes.js', () => ({
      isDate: null,
    }));
  });

  test('should return false if nodeIsDate is falsy and value is not a Date object', () => {
    const isDate = require('../src/isDate.js').default;
    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate(123)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  test('should return true if nodeIsDate is falsy and value is a Date object', () => {
    const isDate = require('../src/isDate.js').default;
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('Mon April 23 2012'))).toBe(true);
    expect(isDate(new Date(2022, 1, 1))).toBe(true);
    expect(isDate(new Date(2022, 1, 1))).toBe(true);
    expect(isDate(new Date('2022-01-01'))).toBe(true);
  });
});