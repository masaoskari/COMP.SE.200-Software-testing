import toNumber from '../src/toNumber.js';
 
describe('toNumber', () => {
 
    test('return input if it is a number', () => {
        expect(toNumber('1')).toBe(1);
        expect(toNumber(-1)).toBe(-1);
        expect(toNumber(0)).toBe(0);
    });
});