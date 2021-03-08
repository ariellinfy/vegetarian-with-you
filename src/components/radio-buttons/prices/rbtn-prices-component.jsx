import React from 'react';
import RadioButton from '../radio-button-component';
import './rbtn-prices-style.scss';

class FormPrices extends React.Component {
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
            <div className='prices-group'>
                <p>How expensive is this restaurant?</p>
                <RadioButton
                    id='prices-1'
                    value='cheap eats'
                    name='prices'
                    checked={this.state.selectedOption === 'cheap eats'}
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='prices-2'
                    value='mid-range'
                    name='prices'
                    checked={this.state.selectedOption === 'mid-range'} 
                    handleChange={this.handleChange}
                />
                <RadioButton
                    id='prices-3'
                    value='fine dinning'
                    name='prices'
                    checked={this.state.selectedOption === 'fine dinning'}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
};

export default FormPrices;