import {FIELD_ADD, FIELD_CHANGE_VALUE, IAction, IFieldAction} from './actions';
import {IField} from "./components/iField";

interface IState {
    mode: string,
    fields: IField[];
}

export const initState: IState = {
    mode: 'admin',
    fields: [],
};

export  default  function reducer(state: IState, action: IAction): any {
    switch (action.type) {
        case FIELD_ADD:
            return onAddField(state, <IFieldAction>action);
        case FIELD_CHANGE_VALUE:
            return onChangeFieldValue(state, <IFieldAction>action);
        default:
            return state;
    }
}

let id = 1;
function onAddField(state: IState, {field}: IFieldAction): any {
    let fields = state.fields.slice(0);

    fields = fields.concat([{
        type: field.type,
        id: id++,
        name: field.name || '',
        value: field.value || '',
    }]);

    return {
        ...state,
        fields,
    };
}

function onChangeFieldValue(state: IState, {field}: IFieldAction): any {
    let fields = state.fields.slice(0);

    const newField = fields.find(old => old.id === field.id);
    newField.value = field.value;

    return {
        ...state,
        fields,
    };
}