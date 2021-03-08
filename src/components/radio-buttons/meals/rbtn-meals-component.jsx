import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-meals-style.scss';

class FormMeals extends React.Component {
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
            <div className='meals-group'>
                <p>Meals</p>
                <RadioButton
                    id='meals-1'
                    value='breakfast'
                    name='meals'
                    checked={this.state.selectedOption === 'breakfast'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='meals-2'
                    value='brunch'
                    name='meals'
                    checked={this.state.selectedOption === 'brunch'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='meals-3'
                    value='lunch'
                    name='meals'
                    checked={this.state.selectedOption === 'lunch'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='meals-4'
                    value='dinner'
                    name='meals'
                    checked={this.state.selectedOption === 'dinner'} 
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
};

export default FormMeals;