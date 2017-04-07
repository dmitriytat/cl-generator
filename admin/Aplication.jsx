import React from 'react';
import {connect} from 'react-redux';

import Grid from 'react-uikit-grid';
import Panel from 'react-uikit-panel';
import Form from 'react-uikit-form';
import FormInput from 'react-uikit-form/lib/form-input';
import FormReduxInput from 'react-uikit-form/lib/form-redux-input';
import Icons from 'react-uikit-icons';
import Button from 'react-uikit-button';

import injectSheet from 'react-jss';
import autobind  from 'autobind-decorator';

import * as actions from './actions';

const sheet = {
    application: {
        // backgroundColor: '#eee',
    },
    control: {
        display: 'inline-block',
        width: '80%',

    },
    button: {
        display: 'inline-block',
        width: '20%',
        position: 'relative',
        top: '7px',
    }
};

const TYPES = ['text', 'checkbox', 'radio', 'select'];

@injectSheet(sheet)
@connect(state => ({
    mode: state.mode,
    fields: state.fields,
    currentField: state.currentField,
}))
export default class Application extends React.Component {
    render() {
        const {classes, fields, currentField} = this.props;
        const currentFieldParams = fields.find(({id}) => currentField === id);

        return (
            <div className={classes.application}>
                <Grid gutter='small'>
                    <Panel col='1-3' box>
                        {TYPES.map((type, i) =>
                            <div key={i}>
                                <div className={classes.control}>
                                    <FormInput
                                        type={type}
                                        label={type}
                                    />
                                </div>
                                <div className={classes.button}>
                                    <Button context='success' margin='bottom right' onClick={() => this.handleAddControl(type)}>
                                        <Icons icon='plus' />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Panel>

                    <Panel col='1-3' box>
                        {this.props.fields.map(({id, label, type, value, name}) =>
                            <div key={id}>
                                <div className={classes.control}>
                                    <FormInput
                                        type={type}
                                        label={label}
                                        id={id}
                                        value={value}
                                        name={name}
                                    />
                                </div>
                                <div className={classes.button}>
                                    <Button context='success' margin='bottom right' onClick={() => this.handleControlProp(id)}>
                                        <Icons icon='cog' />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Panel>

                    <Panel col='1-3' box>
                        {currentFieldParams && Object.keys(currentFieldParams).map(key =>
                            <FormInput
                                key={key}
                                type='text'
                                label={key}
                                value={currentFieldParams[key]}
                                onChange={(event) => this.handleControlChange(key, event.target.value)}
                            />
                        )}
                    </Panel>
                </Grid>
            </div>
        );
    }

    @autobind
    handleAddControl(type) {
        this.props.dispatch(actions.addField({type}));
    }

    @autobind
    handleControlProp(id) {
        this.props.dispatch(actions.openPropPanel(id));
    }

    @autobind
    handleControlChange(key, value) {
        this.props.dispatch(actions.changeParam(key, value));
    }
}
