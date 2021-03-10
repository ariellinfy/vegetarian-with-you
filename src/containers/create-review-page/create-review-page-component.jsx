import React from 'react';
import { REVIEW_BUTTON_DATA } from '../../components/data';
import FormInput from '../../components/form-input/form-input-component';
import TextArea from '../../components/text-area/text-area-component';
import ButtonContainer from '../../components/select-buttons/button-container-component';
import FormButton from '../../components/form-button/form-button-component';
import './create-review-page-style.scss';

class CreateReviewPage extends React.Component {
    constructor(props) {
        super(props);
        const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
        const today = new Date();
        this.state = {
            buttons: REVIEW_BUTTON_DATA,
            reviewTitle: '',
            reviewContent: '',
            visitPeriod: today.getFullYear() + '-' + (today.getMonth().length > 1 ? today.getMonth() : ('0' + today.getMonth())),
            recommendDish: '',
            minMonth: lastYear.getFullYear() + '-' + ((lastYear.getMonth() + 1).length > 1 ? (lastYear.getMonth() + 1) : '0' + (lastYear.getMonth() + 1))
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    render() {
        const { buttons, reviewTitle, reviewContent, visitPeriod, recommendDish, minMonth } = this.state;
        return (
            <div className='create-review-page'>
                <form className='review-form' id='review-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='reviewTitle' value={reviewTitle} label='Title of Your Review *' handleChange={this.handleChange} required />
                    <TextArea name='reviewContent' value={reviewContent} form='review-form' label='Your Review *' handleChange={this.handleChange} placeholder='Share your experience with other people.' required />
                    <FormInput type='month' name='visitPeriod' value={visitPeriod} min={minMonth} max={visitPeriod} label='When did you visit? *' handleChange={this.handleChange} required />
                    {
                        buttons.map(({ id, ...otherBtnProps }) => (
                            <ButtonContainer key={id} {...otherBtnProps} required />
                        ))
                    }
                    <FormInput type='text' name='recommendDish' value={recommendDish} label='What dish(es) do you recommend?' handleChange={this.handleChange} />
                    <div className='buttons-group'>
                        <FormButton type='button'>Back</FormButton>
                        <FormButton type='submit'>Submit</FormButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateReviewPage;