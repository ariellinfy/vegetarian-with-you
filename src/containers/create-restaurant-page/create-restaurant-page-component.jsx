import React from 'react';
import { RESTAURANT_BUTTON_DATA } from '../../components/data';
import ButtonContainer from '../../components/radio-buttons/button-container/button-container-component';
// import FormGeneral from '../../components/radio-buttons/general/rbtn-general-component';
// import FormTypes from '../../components/radio-buttons/types/rbtn-types-component';
// import FormCuisine from '../../components/radio-buttons/cuisine/rbtn-cuisine-component';
// import FormMeals from '../../components/radio-buttons/meals/rbtn-meals-component';
import './create-restaurant-page-style.scss';


class CreateRestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: RESTAURANT_BUTTON_DATA
        }
    }

    render() {
        const { buttons } = this.state;
        return (
            <div className=''>
                {
                    buttons.map(({ id, ...otherBtnProps }) => (
                        <ButtonContainer key={id} {...otherBtnProps} />
                    ))
                }
            </div>
        )
    }
}


// const CreateRestaurantPage = () => {
//     return (
//         <div className='create-restaurant-page'>
//             <FormTypes />
//             <FormCuisine />
//             <FormMeals />
//             <FormGeneral title='Free Wifi?' group='wifi' />
//             <FormGeneral title='Takeaway?' group='takeaway' />
//             <FormGeneral title='Delivery?' group='delivery' />
//             <FormGeneral title='Exclude 5 pungent vegetables?' group='pungent' />
//         </div>
//     );
// }

export default CreateRestaurantPage;