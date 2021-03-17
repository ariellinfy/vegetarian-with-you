import React, { useState } from 'react';
import './home-page-style.scss';

const HomePage = () => {


    return (
        <div className='home-page'>
            <header className='homepage-header'>
                <div className='homepage-welcome-container'>
                    <h1>Vegetarian with me!</h1>
                </div>
            </header>
            <div className='homepage-body'>
                <div className='homepage-feature-container'>
                    <div className='feature-image'>
                        <img alt='homepage-img-1' src={require('../../assets/review.png')} />
                    </div>
                    <div className='feature-text'>

                    </div>
                </div>
                <div className='homepage-feature-container'>
                    <div className='feature-text'>

                    </div>
                    <div className='feature-image'>

                    </div>
                </div>
                <div className='homepage-feature-container'>
                    <div className='feature-image'>

                    </div>
                    <div className='feature-text'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;