import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signUpStart, signUpFailure, resetAuthStatus } from '../../redux/user/user-actions';
import { selectSignUpPending, selectSignUpErr } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import AlertMessage from '../alert-message/alert-message-component';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-up-style.scss';

const SignUp = ({ signUpStart, signUpFailure, resetAuthStatus, signUpPending, signUpErr }) => {
    useEffect(() => {
        resetAuthStatus();
    }, []);

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
            signUpFailure("Passwords don't match");
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
                {
                    signUpErr.length ? <AlertMessage severity="error" errMsg={signUpErr} /> : null
                }
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
                    signUpPending ? <Uploader /> : null
                }
            </form>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    signUpPending: selectSignUpPending,
    signUpErr: selectSignUpErr
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredential => dispatch(signUpStart(userCredential)),
    signUpFailure: error => dispatch(signUpFailure(error)),
    resetAuthStatus: () => dispatch(resetAuthStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);