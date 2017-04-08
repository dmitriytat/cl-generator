import React from 'react';
import {connect} from 'react-redux';
import autobind  from 'autobind-decorator';
import injectSheet from 'react-jss';

import {
    Glyphicon,
    Col,
    Row,
    Grid,
    Button,
    Panel,
} from 'react-bootstrap';

import Control from './components/control/control';
import Params from './containers/params/params';

import { calculate } from '../shared/calculate';

import * as actions from './actions';

const sheet = {
    application: {},
    control: {
        display: 'inline-block',
        width: '70%',

    },
    button: {
        display: 'inline-block',
        width: '30%',
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

        return (
            <div className={classes.application}>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col sm={12} md={4}>
                            {TYPES.map((type, i) =>
                                <div key={i}>
                                    <div className={classes.control}>
                                        <Control
                                            id={i.toString()}
                                            type={type}
                                            label={type}
                                        />
                                    </div>
                                    <div className={classes.button}>
                                        <Button onClick={() => this.handleAddControl(type)}>
                                            <Glyphicon glyph="plus"/>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Col>
                        <Col sm={12} md={4}>
                            {this.props.fields.map(({id, label, type, value, name}) =>
                                <div key={id}>
                                    <div className={classes.control}>
                                        <Control
                                            type={type}
                                            label={label}
                                            id={id}
                                            value={value}
                                            name={name}
                                        />
                                    </div>
                                    <div className={classes.button}>
                                        <Button onClick={() => this.handleControlRemove(id)}>
                                            <Glyphicon glyph="remove"/>
                                        </Button>
                                        <Button onClick={() => this.handleControlProp(id)}>
                                            <Glyphicon glyph="option-horizontal"/>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Col>
                        <Col sm={12} md={4}>
                            <Params />
                        </Col>
                    </Row>
                </Grid>
                <Panel header="Ответ '{a}+{b}+{c}'">{calculate('{a}+{b}+{c}', fields)}</Panel>
                <div>
                    {JSON.stringify(fields)}
                </div>
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
    handleControlRemove(id) {
        this.props.dispatch(actions.removeField(id));
    }
}
