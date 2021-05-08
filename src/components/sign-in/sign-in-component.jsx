import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signInStart, resetAuthStatus } from '../../redux/user/user-actions';
import { selectSignInPending, selectSignInErr } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import AlertMessage from '../alert-message/alert-message-component';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-in-style.scss';

const SignIn = ({ signInStart, signInPending, signInErr, resetAuthStatus }) => {
    useEffect(() => {
        resetAuthStatus();
    }, [resetAuthStatus]);
    
    const [userCredential, setCredential] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredential;

    const handleSubmit = event => {
        event.preventDefault();
        signInStart({ email, password });
    };
    
    const handleChange = event => {
        const { value, name } = event.target;
        setCredential({ ...userCredential, [name]: value });
    };

    return (
        <div className='sign-in-container'>
            <Typography variant="h6">Sign in with your email and password</Typography>
            {
                signInErr.length ? <AlertMessage severity="error" errMsg={signInErr} /> : null
            }
            <form className='sign-in-form' onSubmit={handleSubmit}>
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
                
                <div className='buttons-group'>
                    <Button type='submit' className='button-input' variant="contained" color="secondary">Sign In</Button>
                    
                </div>
                {
                    signInPending ? <Uploader /> : null
                }
            </form>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    signInPending: selectSignInPending,
    signInErr: selectSignInErr
});

const mapDispatchToProps = dispatch => ({
    signInStart: userCredential => dispatch(signInStart(userCredential)),
    resetAuthStatus: () => dispatch(resetAuthStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);