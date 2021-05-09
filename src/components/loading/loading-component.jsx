import React from 'react';
import loading from '../../assets/loading.svg';
import './loading-style.scss';

const Loader = () => (
    <div className='loading-container'>
        <object type="image/svg+xml" data={'' || loading} data-gramm="false">Loading</object>
    </div>
);

export default Loader;