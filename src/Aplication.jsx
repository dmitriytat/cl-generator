import React from 'react';
import {connect} from 'react-redux';

import Text from './components/text/text';

import injectSheet from 'react-jss';
import autobind  from 'autobind-decorator';

import * as actions from './actions';

const sheet = {
    application: {
        backgroundColor: '#d4d4d4',
    }
};

@injectSheet(sheet)
@connect(state => (console.log(state),{
    mode: state.mode,
    fields: state.fields,
}))
export default class Application extends React.Component {
    render() {
        const {classes, fields} = this.props;

        return (
            <div className={classes.application}>
                <button onClick={this.handleAddField}>Add Field</button>
                {fields.map(({type, id, ...field}) => {
                    const props = {
                        ...field,
                        id,
                        onChange: this.handleFiledChange,
                    };

                    switch (type) {
                        case 'text':
                            return <Text key={id} {...props} />;
                    }
                })}
            </div>
        );
    }

    @autobind
    handleAddField() {
        this.props.dispatch(actions.addField({type: 'text'}));
    }

    @autobind
    handleFiledChange(id, value) {
        this.props.dispatch(actions.changeFieldValue({id, value}));
    }
}
