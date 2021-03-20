import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-up-style.scss';

const SignUp = () => {
    const [userCredential, setCredential] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { displayName, email, password, confirmPassword } = userCredential;

    const handleSubmit = event => {
        event.preventDefault();

    }
    
    const handleChange = event => {
    const { value, name } = event.target;
    setCredential({ ...userCredential, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <Typography variant="h6">Don't have an account? Let's get started now!</Typography>
                <TextField 
                    className='text-field displayName' 
                    label='Name' 
                    type='text'
                    name='displayName' 
                    value={displayName} 
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
                    name='password' 
                    value={password} 
                    variant="outlined" 
                    onChange={handleChange}
                    fullWidth required 
                />
                <div className='buttons-group'>
                    <Button type='submit' className='button-input' variant="contained" color="secondary">Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;