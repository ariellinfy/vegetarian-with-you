import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import './sign-in-style.scss';

const SignIn = () => {
    const [userCredential, setCredential] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userCredential;

    const handleSubmit = event => {
        event.preventDefault();

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
            </form>
        </div>
    )
}

export default SignIn;