import {calculate} from '../../shared/calculate';

describe("Calculate", () => {
    it("To be correct", () => {
        const fields = [
            {
                name: 'a',
                value: 1,
            },
            {
                name: 'b',
                value: 2,
            },
            {
                name: 'c',
                value: 3,
            },
            {
                name: 'd',
                value: 4,
            },
        ];

        const calculateExpect = (formula) => expect(calculate(formula, fields));

        calculateExpect('{a}+{b}+{c}+{d}').toBe(10);
        calculateExpect('{a}/{b}').toBe(0.5);
        calculateExpect('{a}-{b}').toBe(-1);
    });
});