import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signUpStart, signUpFailure, resetAuthStatus } from '../../redux/user/user-actions';
import { selectSignUpPending, selectSignUpErr } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import AlertMessage from '../alert-message/alert-message-component';
import { TextField, Button, Typography } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import './sign-up-style.scss';

const SignUp = ({ signUpStart, signUpFailure, resetAuthStatus, signUpPending, signUpErr }) => {
    useEffect(() => {
        resetAuthStatus();
    }, [resetAuthStatus]);

    const [userCredential, setCredential] = useState({
        publicName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { publicName, email, password, confirmPassword } = userCredential;

    const regEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    let validEmail = false;
    validEmail = regEmail.test(email);
    
    const regPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/g);
    let validPassword = false;
    validPassword = regPassword.test(password);

    const handleSubmit = event => {
        event.preventDefault();
        if (!publicName.length) {
            return signUpFailure("Please enter a valid name.");
        } else if (!validEmail) {
            return signUpFailure("Invalid email.");
        } else if (!validPassword) {
            return signUpFailure("Password must contain at least 8 characters: at least one number, one uppercase letter, one lowercase letter and one special character.");
        } else if (password !== confirmPassword) {
            return signUpFailure("Passwords don't match.");
        };
        signUpStart({ publicName, email, password });
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
                <div className='input-status-container'>
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
                    {
                        publicName.length ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                    }
                </div>
                <div className='input-status-container'>
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
                    {
                        validEmail ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                    }
                </div>
                <div className='input-status-container'>
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
                    {
                        validPassword ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                    }
                </div>
                <div className='input-status-container'>
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
                    {
                        password === confirmPassword && password.length ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                    }
                </div>
                {
                    validPassword && password === confirmPassword ? null :
                    <Typography variant='body2' color='primary'>Password must contain at least 8 characters: at least one number, one uppercase letter, one lowercase letter and one special character</Typography>
                }
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