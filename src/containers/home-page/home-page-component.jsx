import React from 'react';
import Typography from '@material-ui/core/Typography';
import reviewImage from '../../assets/review.svg';
import discoverImage from '../../assets/discover.svg';
import placeImage from '../../assets/place.svg';
import './home-page-style.scss';

const HomePage = () => {


    return (
        <div className='home-page'>
            <header className='homepage-header'>
                <div className='homepage-welcome-container'>
                    <Typography variant="h1">Taste The Natural</Typography>
                    <Typography variant="h6">Let us find out the romance in the world of vegetables! Come vegetarian with me!</Typography>
                </div>
            </header>
            <div className='homepage-body'>
                <div className='homepage-feature-container feature-container-1'>
                    <div className='feature-image image-1'>
                        <img className='image-1' alt='homepage-img-1' src={reviewImage} />
                    </div>
                    <div className='feature-text'>
                        <Typography variant="h4">Write a review</Typography>
                        <Typography variant="body1">Share your experience with more people! Click on "Write review" button to get started!</Typography>
                    </div>
                </div>
                <div className='homepage-feature-container feature-container-2'>
                    <div className='feature-text'>
                        <Typography variant="h4">Discover restaurants</Typography>
                        <Typography variant="body1">Wondering where to eat? Discover more fabulous and delicious restaurants in Explore!</Typography>
                    </div>
                    <div className='feature-image image-2'>
                        <img className='image-2' alt='homepage-img-2' src={discoverImage} />
                    </div>
                </div>
                <div className='homepage-feature-container feature-container-3'>
                    <div className='feature-image'>
                        <img className='image-3' alt='homepage-img-3' src={placeImage} />
                    </div>
                    <div className='feature-text'>
                        <Typography variant="h4">Add a place</Typography>
                        <Typography variant="body1">You know an awesome restaurant but it's not here? Add it on! so more people can benefit from the beauty of green diets!</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;