import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import SignIn from '../../components/sign-in/sign-in-component';
import SignUp from '../../components/sign-up/sign-up-component';
import './signin-signup-page-style.scss';

const SignInAndSignUpPage = () => {
    const [ value, setValue ] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='signin-signup-page'>
            <div className='signin-signup-form-container'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Sign In" className='tab' />
                    <Tab label="Sign Up" className='tab' />
                </Tabs>

                {
                    value === 0 ? <SignIn /> : <SignUp />
                }
            </div>
        </div>
    )
}

export default SignInAndSignUpPage;