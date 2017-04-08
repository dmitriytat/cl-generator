import {
    FIELD_ADD,
    FIELD_CHANGE_VALUE,
    IFieldAction,
    FIELD_OPEN_FIELD_PARAM,
    FIELD_PARAM_CHANGE_VALUE, FIELD_REMOVE,
} from './actions';
import {IField, Id} from "../shared/components/IField";

interface IState {
    mode: string,
    fields: IField[];
    currentField: Id;
}

export const initState: IState = {
    mode: 'admin',
    fields: [],
    currentField: null,
};

export  default  function reducer(state: IState, action: any): IState {
    switch (action.type) {
        case FIELD_ADD:
            return onAddField(state, action);
        case FIELD_OPEN_FIELD_PARAM:
            return onOpenFieldParam(state, action);
        case FIELD_REMOVE:
            return onRemoveField(state, action);
        case FIELD_PARAM_CHANGE_VALUE:
            return onChangeFieldParam(state, action);
        default:
            return state;
    }
}

let id = 1;
function onAddField(state: IState, {field}: IFieldAction): IState {
    let fields = state.fields.slice(0);

    fields = fields.concat([{
        type: field.type,
        id: (id++).toString(),
        name: field.name || '',
        value: field.value || '',
        label: field.label || '',
    }]);

    return {
        ...state,
        fields,
    };
}

function onChangeFieldParam(state: IState, {field}: IFieldAction): IState {
    const fields = state.fields.slice(0);

    const newFieldIndex = fields.findIndex(old => old.id === state.currentField);
    fields[newFieldIndex] = {
        ...fields[newFieldIndex],
        ...field,
    };

    return {
        ...state,
        fields,
    };
}

function onOpenFieldParam(state: IState, {field}: IFieldAction): IState {
    return {
        ...state,
        currentField: field.id,
    };
}

function onRemoveField(state: IState, {field}: IFieldAction) {
    const fields = state.fields.filter(f => f.id !== field.id);

    return {
        ...state,
        fields,
    };
}