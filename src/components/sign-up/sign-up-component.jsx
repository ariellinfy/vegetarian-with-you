import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signUpStart } from '../../redux/user/user-actions';
import { selectAuthPending } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-up-style.scss';

const SignUp = ({ signUpStart, authPending }) => {
    const [userCredential, setCredential] = useState({
        publicName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { publicName, email, password, confirmPassword } = userCredential;

    const handleSubmit = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        };
        signUpStart({publicName, email, password});
    };
    
    const handleChange = event => {
        const { value, name } = event.target;
        setCredential({ ...userCredential, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <Typography variant="h6">Don't have an account? Let's get started now!</Typography>
                <TextField 
                    className='text-field publicName' 
                    label='Name' 
                    type='text'
                    name='publicName' 
                    value={publicName} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />
                <TextField 
                    className='text-field email' 
                    label='Email' 
                    type='email'
                    name='email' 
                    value={email} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />
                <TextField 
                    className='text-field password' 
                    label='Password' 
                    type='password' 
                    name='password' 
                    value={password} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />
                <TextField 
                    className='text-field password' 
                    label='Confirm Password' 
                    type='password' 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />
                <div className='buttons-group'>
                    <Button type='submit' className='button-input' variant="contained" color="secondary">Sign Up</Button>
                </div>
                {
                    authPending ? <Uploader /> : null
                }
            </form>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    authPending: selectAuthPending
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredential => dispatch(signUpStart(userCredential))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);