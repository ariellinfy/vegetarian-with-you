import React from 'react';
import './select-button-style.scss';

class SelectButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        };
    }
    
    handleChange = event => {
        this.setState({ selectedOption: event.target.value });
        console.log(event.target)
    }

    render() {
        const { id, name, value, ...otherProps } = this.props;
        return (
            <div className='select-button'>
                <label className={`${this.state.selectedOption === value ? 'selected' : ''}`} htmlFor={id}>
                    <input 
                        id={id} 
                        name={name}
                        value={value} 
                        checked={this.state.selectedOption === value}
                        onChange={this.handleChange}
                        {...otherProps} 
                    />
                    {value}
                </label>
            </div>
        )
    }
}

export default SelectButton;
// className={`${this.state.selectedOption === value ? 'selected' : ''}`}