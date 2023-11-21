import countBy from '../src/countBy.js';
const { toBeGreaterThan, toEqual, not } = require('jest-extended');
const { matchers } = require('jest-chain');
expect.extend({ ...matchers });

describe('countBy', () => {
  test('should count by a property of objects in an array', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'betty', 'active': true },
      { 'user': 'fred', 'active': false }
    ];
    expect(countBy(users, value => value.active)).toEqual({ 'true': 2, 'false': 1 });
  });

  test('should count by a property of objects in an object', () => {
    const users = {
      'a': { 'user': 'barney', 'active': true },
      'b': { 'user': 'betty', 'active': true },
      'c': { 'user': 'fred', 'active': false }
    };
    expect(countBy(users, value => value.active)).toEqual({ 'true': 2, 'false': 1 });
  });

  test('should count by the values in an array', () => {
    const array = [1, 2, 3, 2, 1];
    expect(countBy(array, value => value)).toEqual({ '1': 2, '2': 2, '3': 1 });
  });

  test('should count by the values in an object', () => {
    const object = { 'a': 1, 'b': 2, 'c': 3, 'd': 2, 'e': 1 };
    expect(countBy(object, value => value)).toEqual({ '1': 2, '2': 2, '3': 1 });
  });

  test('should handle empty collections', () => {
    expect(countBy([], value => value)).toEqual({});
    expect(countBy({}, value => value)).toEqual({});
  });

  test('should handle null and undefined', () => {
    expect(countBy(null, value => value)).toEqual({});
    expect(countBy(undefined, value => value)).toEqual({});
  });

});