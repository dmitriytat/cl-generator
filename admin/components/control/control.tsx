import * as React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox,
    Radio,
} from 'react-bootstrap';

interface IControlProps {
    id: string;
    label: string;
    type: string;
    help?: string;
}

export default class Control extends React.Component<IControlProps, any> {
    static defaultProps = {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        help: React.PropTypes.string,
    }

    render() {
        const {id, label, help, type, ...props} = this.props;

        return (
            <FormGroup controlId={id}>
                {this.renderInput(type, label, props)}
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        )
    }

    renderInput(type: string, label: string, props: any) {
        switch (type) {
            case 'checkbox':
                return <Checkbox {...props}>{label}</Checkbox>;
            case 'radio':
                return <Radio {...props}>{label}</Radio>;
            default:
                return <div><ControlLabel>{label}</ControlLabel><FormControl type={type} {...props}/></div>
        }
    }
}