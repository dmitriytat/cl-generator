import {IField} from "./components/iField";
export const FIELD_ADD = 'FIELD_ADD';
export const FIELD_CHANGE_VALUE = 'FIELD_CHANGE_VALUE';

export interface IAction {
    type: string;
}

export interface IFieldAction extends IAction {
    field: IField;
}

export function addField(field: IField): IFieldAction {
    return {
        type: FIELD_ADD,
        field,
    }
}

export function changeFieldValue(field: IField): IFieldAction {
    return {
        type: FIELD_CHANGE_VALUE,
        field,
    }
}
