import React from 'react';
import upload from '../../assets/fetching.svg';
import './uploading-style.scss';

const Uploader = () => (
    <div className='upload-container'>
        <object type="image/svg+xml" data={upload || ''}>svg-animation</object>        
    </div>
);

export default Uploader;