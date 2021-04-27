import React from 'react';
import download from '../../assets/download.svg';
import './downloading-style.scss';

const Downloader = () => (
    <div className='download-container'>
        <object type="image/svg+xml" data={download || ''}>svg-animation</object>        
    </div>
);

export default Downloader;