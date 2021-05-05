import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signUpStart, signUpFailure, resetAuthStatus } from '../../redux/user/user-actions';
import { selectSignUpPending, selectSignUpErr } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import AlertMessage from '../alert-message/alert-message-component';
import { TextField, Button, Typography, Tooltip } from '@material-ui/core';
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

    const [credentialValidation, validateCredential] = useState({
        validName: false,
        validEmail: false,
        validPassword: false,
        validConfirmPassword: false
    })
    const { validName, validEmail, validPassword, validConfirmPassword } = credentialValidation;

    const handleSubmit = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return signUpFailure("Passwords don't match");
        };
        signUpStart({ publicName, email, password });
    };
    
    const handleChange = event => {
        const { value, name } = event.target;
        console.log(name, value)
        setCredential({ ...userCredential, [name]: value });
        console.log(nameValidation())

        validateCredential({ ...credentialValidation, validName: true });
        
        validateCredential({ ...credentialValidation, validConfirmPassword: confirmPasswordValidation() ? true : false });
        if (name === 'email') {
            validateCredential({ ...credentialValidation, validEmail: emailValidation(value) ? true : false });
        } else if (name === 'password') {
            validateCredential({ ...credentialValidation, validPassword: passwordValidation(value) ? true : false });
        }
    };

    const nameValidation = () => {
        return publicName.length ? true : false;
    };

    const emailValidation = email => {
        let reg = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
        return reg.test(email);
    };

    const passwordValidation = password => {
        let reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/g);
        return reg.test(password);
    };

    const confirmPasswordValidation = () => {
        return password === confirmPassword ? true : false;
    };

    console.log('validName', validName);
    // console.log('validEmail', validEmail);
    // console.log('validPassword', validPassword);
    // console.log('validConfirmPassword', validConfirmPassword);

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
                <Typography variant='body2' color='primary'>Password must contain at least 8 characters: at least one number, one uppercase letter, one lowercase letter and one special character</Typography> 
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