import React from 'react';
import injectSheet from 'react-jss';
import {connect} from 'react-redux';
import autobind  from 'autobind-decorator';

import Control from '../../components/control/control';

import * as actions from '../../actions';

const sheet = {
    params: {
        // backgroundColor: '#eee',
    },
};

@injectSheet(sheet)
@connect(state => ({
    fields: state.fields,
    currentField: state.currentField,
}))
export default class Params extends React.Component {
    render() {
        const {classes, fields, currentField} = this.props;
        const currentFieldParams = fields.find(({id}) => currentField === id);

        return (
            <div className={classes.params}>
                {currentFieldParams &&
                Object.keys(currentFieldParams)
                    .filter(f => !['id', 'type'].includes(f))
                    .map(key =>
                        <Control
                            key={key}
                            type='text'
                            label={key}
                            value={currentFieldParams[key]}
                            onChange={(event) => this.handleControlChange(key, event.target.value)}
                        />
                    )
                }
            </div>
        );
    }

    @autobind
    handleControlChange(key, value) {
        this.props.dispatch(actions.changeParam(key, value));
    }
}
