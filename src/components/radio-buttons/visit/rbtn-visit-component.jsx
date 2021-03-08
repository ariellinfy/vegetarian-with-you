import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-visit-style.scss';

class FormVisit extends React.Component {
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
            <div className='visit-group'>
                <p>What sort of visit was this?</p>
                <RadioButton
                    id='visit-1'
                    value='couples'
                    name='visit'
                    checked={this.state.selectedOption === 'couples'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='visit-2'
                    value='family'
                    name='visit'
                    checked={this.state.selectedOption === 'family'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='visit-3'
                    value='friends'
                    name='visit'
                    checked={this.state.selectedOption === 'friends'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='visit-4'
                    value='business'
                    name='visit'
                    checked={this.state.selectedOption === 'business'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='visit-5'
                    value='solo'
                    name='visit'
                    checked={this.state.selectedOption === 'solo'}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
};

export default FormVisit;