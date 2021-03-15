import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './create-new-btn-style.scss';

const CreateNewButton = ({ btnType }) => {


    return (
        <div className='create-new-btn-container'>
            <Button variant="contained" color="primary">
                Create a {btnType}
            </Button>
        </div>
    )
}

export default CreateNewButton;