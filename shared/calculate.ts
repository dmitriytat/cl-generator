import {IField} from './components/IField';

export function calculate(formula: string = '', fields: IField[] = []): number {
    let newFormula = formula;

    fields.forEach(function (field) {
        newFormula = newFormula.replace(new RegExp(`{${field.name}}`), field.value);
    });

    return (function (formula) {
        'use strict';
        try {
            return eval(formula);
        } catch (e)  {
            return NaN;
        }
    })(newFormula);
}