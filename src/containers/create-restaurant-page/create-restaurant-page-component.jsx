import React from 'react';
import FormGeneral from '../../components/radio-buttons/general/rbtn-general-component';
import FormTypes from '../../components/radio-buttons/types/rbtn-types-component';
import FormCuisine from '../../components/radio-buttons/cuisine/rbtn-cuisine-component';
import FormMeals from '../../components/radio-buttons/meals/rbtn-meals-component';
import './create-restaurant-page-style.scss';

const CreateRestaurantPage = () => {
    return (
        <div className='create-restaurant-page'>
            <FormTypes />
            <FormCuisine />
            <FormMeals />
            <FormGeneral title='Free Wifi?' group='wifi' />
            <FormGeneral title='Takeaway?' group='takeaway' />
            <FormGeneral title='Delivery?' group='delivery' />
            <FormGeneral title='Exclude 5 pungent vegetables?' group='pungent' />
        </div>
    );
}

export default CreateRestaurantPage;