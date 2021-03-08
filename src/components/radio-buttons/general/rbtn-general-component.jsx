import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-general-style.scss';

class FormGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        };
      }
    
    handleChange = event => {
        this.setState({ selectedOption: event.target.value });
    }

    render() {
        return (
            <div className='general-group'>
                <p>{this.props.title}</p>
                <RadioButton
                    id={`{this.props.group}-1`}
                    value='yes'
                    name={this.props.group}
                    checked={this.state.selectedOption === 'yes'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id={`{this.props.group}-2`}
                    value='no'
                    name={this.props.group}
                    checked={this.state.selectedOption === 'no'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id={`{this.props.group}-3`}
                    value='not sure'
                    name={this.props.group}
                    checked={this.state.selectedOption === 'not sure'}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
};

export default FormGeneral;