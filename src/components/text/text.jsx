import React from 'react';

import injectSheet from 'react-jss';
import autobind  from 'autobind-decorator';

const sheet = {
    button: {
        color: 'red'
    }
};

@injectSheet(sheet)
export default class Text extends React.Component {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        value: '',
        onChange: (id, value) => {}
    }

    render() {
        const {value, name, classes} = this.props;

        return (
            <div>
                <input className={classes.button} value={value} name={name} onChange={this.handleChange}/>
            </div>
        );
    }

    @autobind
    handleChange(event) {
        const value = event.target.value;

        console.log(this.props.id, value)

        this.props.onChange(this.props.id, value);
    }
}
