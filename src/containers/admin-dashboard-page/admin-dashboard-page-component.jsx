import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import UserProfile from '../../components/user-profile/user-profile-component';
import './admin-dashboard-page-style.scss';

const AdminDashboardPage = () => {
    const [ value, setValue ] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='admin-dashboard-page'>
            <div position="static" className='admin-dashboard-container'>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="User Profile" className='admin-tab' />
                    <Tab label="Account Info" className='admin-tab' />
                    <Tab label="My Reviews" className='admin-tab' />
                </Tabs>
                <UserProfile />
                {
                    // value === 0 ? <SignIn /> : <SignUp />
                }
            </div>
            
        </div>
    )
}

export default AdminDashboardPage;