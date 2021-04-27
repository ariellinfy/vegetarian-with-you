import React from 'react';
import loading from '../../assets/loading.svg';
import './loading-style.scss';

const Loader = () => (
    <div className='loading-container'>
        <object type="image/svg+xml" data={loading || ''}>svg-animation</object>        
    </div>
);

export default Loader;