import React, { useState } from 'react';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import './user-profile-style.scss';

const UserProfile = () => {
    const [ user, setUser ] = useState({
        publicName: 'Ariel Lin',
        contributionAmount: 2,
        location: 'Calgary, Canada',
        joined: 'March 2021'
    });
    const { publicName, contributionAmount, location, joined } = user;

    return (
        <div className='user-profile-page'>
            <Paper className='profile-header'>
                <div className='profile-header-1'>
                    <Avatar className='user-avatar'>N</Avatar>
                    <div className='user-info'>
                        <Typography variant='h6' gutterBottom >{publicName}</Typography>
                        <Typography variant='subtitle1' >Contributions</Typography>
                        <Typography variant='subtitle1' color='textSecondary' gutterBottom >{contributionAmount}</Typography>
                    </div>
                </div>
                <div className='profile-header-2'>
                    <Button className="update-button" variant="contained" color="primary">
                        Update Profile
                    </Button>
                </div>
            </Paper>
            <Paper className='profile-body'>
                <div className='user-detail'>
                    <i className="fa fa-map-marker"></i>
                    <Typography className="info" variant='subtitle1'>{location}</Typography>
                </div>
                <div className='user-detail'>
                    <i class="fa fa-calendar"></i>
                    <Typography className="info" variant='subtitle1'>{joined}</Typography>
                </div>
                <div className='user-detail'>
                    <i class="fa fa-pencil"></i>
                    <Button className="review-button" color="primary">Write review</Button>
                </div>
            </Paper>
        </div>
    )
}

export default UserProfile;