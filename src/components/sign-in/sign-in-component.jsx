import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signInStart } from '../../redux/user/user-actions';
import { selectAuthPending } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-in-style.scss';

const SignIn = ({ signInStart, authPending }) => {
    const [userCredential, setCredential] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userCredential;

    const handleSubmit = event => {
        event.preventDefault();
        signInStart({ email, password });
    }
    
    const handleChange = event => {
        const { value, name } = event.target;
        setCredential({ ...userCredential, [name]: value });
    }

    return (
        <div className='sign-in-container'>
            <Typography variant="h6">Sign in with your email and password</Typography>
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
    signInStart: userCredential => dispatch(signInStart(userCredential))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);