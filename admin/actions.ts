import {IField, Id} from "../shared/components/IField";
export const FIELD_ADD = 'FIELD_ADD';
export const FIELD_CHANGE_VALUE = 'FIELD_CHANGE_VALUE';
export const FIELD_OPEN_FIELD_PARAM = 'FIELD_OPEN_FIELD_PARAM';
export const FIELD_PARAM_CHANGE_VALUE = 'FIELD_PARAM_CHANGE_VALUE';
export const FIELD_REMOVE = 'FIELD_REMOVE';

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

export function openPropPanel(id: Id): IFieldAction {
    return {
        type: FIELD_OPEN_FIELD_PARAM,
        field: {
            id,
        },
    }
}

export function removeField(id: Id): IFieldAction {
    return {
        type: FIELD_REMOVE,
        field: {
            id,
        },
    }
}

export function changeParam(key: string, value: string): IFieldAction {
    return {
        type: FIELD_PARAM_CHANGE_VALUE,
        field: {
            [key]: value,
        },
    }
}

export function changeFieldValue(field: IField): IFieldAction {
    return {
        type: FIELD_CHANGE_VALUE,
        field,
    }
}
