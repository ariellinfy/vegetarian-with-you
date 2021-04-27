import React from 'react';
import upload from '../../assets/upload.svg';
import './uploading-style.scss';

const Uploader = () => (
    <div className='upload-container'>
        <object type="image/svg+xml" data={upload || ''}></object>
    </div>
);

export default Uploader;