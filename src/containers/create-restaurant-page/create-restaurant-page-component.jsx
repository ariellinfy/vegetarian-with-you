import React from 'react';
import { RESTAURANT_BUTTON_DATA } from '../../components/data';
import FormInput from '../../components/form-input/form-input-component';
import ButtonContainer from '../../components/select-buttons/button-container-component';
import FormButton from '../../components/form-button/form-button-component';
import './create-restaurant-page-style.scss';

class CreateRestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: RESTAURANT_BUTTON_DATA,
            restaurantName: '',
            restaurantAddress: '',
            restaurantCity: '',
            restaurantProvince: '',
            restaurantCountry: '',
            restaurantPostalCode: '',
            restaurantPhone: '',
            restaurantWebsite: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
        console.log(name, value);
    }

    render() {
        const { buttons, restaurantName, restaurantAddress, restaurantCity, restaurantProvince, restaurantCountry, restaurantPostalCode, restaurantPhone, restaurantWebsite } = this.state;
        return (
            <div className='create-restaurant-page'>
                <form className='restaurant-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='restaurantName' value={restaurantName} label='Restaurant Name *' handleChange={this.handleChange} required />
                    <FormInput type='text' name='restaurantAddress' value={restaurantAddress} label='Restaurant Address *' handleChange={this.handleChange} required />
                    <FormInput type='text' name='restaurantCity' value={restaurantCity} label='City *' handleChange={this.handleChange} required />
                    <FormInput type='text' name='restaurantProvince' value={restaurantProvince} label='Province' handleChange={this.handleChange} />
                    <FormInput type='text' name='restaurantCountry' value={restaurantCountry} label='Country *' handleChange={this.handleChange} required />
                    <FormInput type='text' name='restaurantPostalCode' value={restaurantPostalCode} label='Postal Code' handleChange={this.handleChange} />
                    <FormInput type='tel' name='restaurantPhone' value={restaurantPhone} label='Phone' handleChange={this.handleChange} />
                    <FormInput type='url' name='restaurantWebsite' value={restaurantWebsite} label='Website' handleChange={this.handleChange} />
                    {
                        buttons.map(({ id, ...otherBtnProps }) => (
                            <ButtonContainer key={id} {...otherBtnProps} />
                        ))
                    }
                    <div className='buttons-group'>
                        <FormButton type='button'>Back</FormButton>
                        <FormButton type='submit'>Submit</FormButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default CreateRestaurantPage;