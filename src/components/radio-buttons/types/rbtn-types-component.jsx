import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-types-style.scss';

class FormTypes extends React.Component {
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
            <div className='types-group'>
                <p>Type</p>
                <RadioButton
                    id='types-1'
                    value='lacto'
                    name='types'
                    checked={this.state.selectedOption === 'lacto'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='types-2'
                    value='ovo'
                    name='types'
                    checked={this.state.selectedOption === 'ovo'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='types-3'
                    value='ovo-lacto'
                    name='types'
                    checked={this.state.selectedOption === 'ovo-lacto'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='types-4'
                    value='vegan'
                    name='types'
                    checked={this.state.selectedOption === 'vegan'} 
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
};

export default FormTypes;