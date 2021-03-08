import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-cuisine-style.scss';

class FormCuisine extends React.Component {
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
                <div className='cuisine-group'>
                    <p>Cuisine</p>
                    <RadioButton
                        id='cuisine-1'
                        value='chinese'
                        name='cuisine'
                        checked={this.state.selectedOption === 'chinese'}
                        handleChange={this.handleChange}
                    />
                    <RadioButton
                        id='cuisine-2'
                        value='western'
                        name='cuisine'
                        checked={this.state.selectedOption === 'western'} 
                        handleChange={this.handleChange}
                    />
                    <RadioButton
                        id='cuisine-3'
                        value='other'
                        name='cuisine'
                        checked={this.state.selectedOption === 'other'}
                        handleChange={this.handleChange}
                    />
                </div>
        )
    }
};

export default FormCuisine;