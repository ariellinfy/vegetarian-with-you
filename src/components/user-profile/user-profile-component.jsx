import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EditProfile from '../../components/edit-profile/edit-profile-component';
import UploadAvatar from '../../components/upload-avatar/upload-avatar-component';
import { Button, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import './user-profile-style.scss';

const UserProfile = ({ user: { user_id, public_name, contributions, location, joined } }) => {

    const [openEditProfile, setEditProfileOpen] = useState(false);

    const handleEditProfileClick = () => {
        setEditProfileOpen(true);
    };

    const handleEditProfileClose = () => {
        setEditProfileOpen(false);
    };

    return (
        <div className='user-profile-page'>
            <Paper className='profile-header'>
                <div className='profile-header-1'>
                    <div className='user-avatar'>
                        <UploadAvatar userId={user_id} />
                    </div>
                
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
                {
                    user_id ? (
                        <div className='profile-header-2'>
                            <Button className="update-button" variant="contained" color="primary" onClick={handleEditProfileClick}>
                                Update Profile
                            </Button>
                            <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={handleEditProfileClose} />
                        </div>
                    ) : (
                        <div className='profile-header-2'>
                            <Button component={Link} to={'/signin'} className="update-button" variant="contained" color="primary">
                                Update Profile
                            </Button>
                        </div>
                    )
                }
            </Paper>
            <Paper className='profile-body'>
                <div className='user-detail'>
                    <LocationOnIcon fontSize="small" />
                    {
                        location ? (
                            <Typography className="info" variant='subtitle1'>{location}</Typography>
                        ) : (
                            user_id ? (
                                <div>
                                    <Button className="review-button" color="primary" onClick={handleEditProfileClick}>
                                        Add your current city
                                    </Button>
                                    <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={handleEditProfileClose} />
                                </div>
                            ) : (
                                <div>
                                    <Button component={Link} to={'/signin'} className="review-button" color="primary">
                                        Add your current city
                                    </Button>
                                </div>
                            )
                        )
                    }
                </div>
                <div className='user-detail'>
                    <EventIcon fontSize="small" />
                        {
                            joined ? (
                                <Typography className="info" variant='subtitle1'>{joined.split('T')[0]}</Typography>
                            ) : (
                                <Typography className="info" variant='subtitle1'>N/A</Typography>
                            )
                        }
                </div>
                <div className='user-detail'>
                    <CreateIcon fontSize="small" />
                    {
                        user_id ? (
                            <Button component={Link} to={'/find'} className="review-button" color="primary">Write review</Button>
                        ) : (
                            <Button component={Link} to={'/signin'} className="review-button" color="primary">Write review</Button>
                        )
                    } 
                </div>
            </Paper>
        </div>
    )
};

export default UserProfile;