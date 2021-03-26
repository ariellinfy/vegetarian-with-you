import React, { useState } from 'react';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import EditProfile from '../../components/edit-profile/edit-profile-component';
import './user-profile-style.scss';

const UserProfile = ({ user: { public_name, contributions, location, joined } }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='user-profile-page'>
            <Paper className='profile-header'>
                <div className='profile-header-1'>
                    <Avatar className='user-avatar'>N</Avatar>
                    <div className='user-info'>
                        {
                            public_name ? (
                                <Typography variant='h6' gutterBottom >{public_name}</Typography>
                            ) : (
                                <Typography variant='h6' gutterBottom>N/A</Typography>
                            )
                        }
                        <Typography variant='subtitle1' >Contributions</Typography>
                        {
                            contributions >= 0 ? (
                                <Typography variant='subtitle1' color='textSecondary' gutterBottom >{contributions}</Typography>
                            ) : (
                                <Typography className="info" variant='body2'>N/A</Typography>
                            )
                        }
                    </div>
                </div>
                <div className='profile-header-2'>
                    <Button className="update-button" variant="contained" color="primary" onClick={handleClickOpen}>
                        Update Profile
                    </Button>
                    <EditProfile publicName={public_name} location={location} open={open} handleClose={handleClose} />
                </div>
            </Paper>
            <Paper className='profile-body'>
                <div className='user-detail'>
                    <i className="fa fa-map-marker"></i>
                    {
                        location ? (
                            <Typography className="info" variant='subtitle1'>{location}</Typography>
                        ) : (
                            <div>
                                <Button className="review-button" color="primary" onClick={handleClickOpen}>
                                    Add your current city
                                </Button>
                                <EditProfile publicName={public_name} location={location} open={open} handleClose={handleClose} />
                            </div>
                        )
                    }
                </div>
                <div className='user-detail'>
                    <i className="fa fa-calendar"></i>
                        {
                            joined ? (
                                <Typography className="info" variant='subtitle1'>{joined.split('T')[0]}</Typography>
                            ) : (
                                <Typography className="info" variant='subtitle1'>N/A</Typography>
                            )
                        }
                </div>
                <div className='user-detail'>
                    <i className="fa fa-pencil"></i>
                    <Button className="review-button" color="primary">Write review</Button>
                </div>
            </Paper>
        </div>
    )
}

export default UserProfile;