import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import UserProfile from '../../components/user-profile/user-profile-component';
import AccountInfo from '../../components/account-info/account-info-component';
import UserReviews from '../../components/user-reviews/user-reviews-component';
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
                {
                    value === 0 ? <UserProfile /> : (value === 1 ? <AccountInfo /> : <UserReviews />)
                }
            </div>
        </div>
    )
}

export default AdminDashboardPage;