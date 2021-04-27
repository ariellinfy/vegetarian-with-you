import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestUserStart } from '../../redux/user/user-actions';

import EditProfile from '../../components/edit-profile/edit-profile-component';
import UploadAvatar from '../../components/upload-avatar/upload-avatar-component';
import { Button, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import './user-profile-style.scss';

const UserProfile = ({ user: { user_id, public_name, avatar, contributions, location, joined }, requestUserStart }) => {

    let currentUserToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    useEffect(() => {
        requestUserStart({ currentUserToken });
    }, []);

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
                        <UploadAvatar userId={user_id} avatar={avatar} />
                    </div>
                
                    <div className='user-info'>
                        {
                            <Typography variant='h6' gutterBottom >{public_name ? public_name : `N/A`}</Typography>
                        }
                        <Typography variant='subtitle1' >Contributions</Typography>
                        {
                            contributions >= 0 ? (
                                <Typography variant='subtitle1' color='textSecondary'>{contributions}</Typography>
                            ) : (
                                <Typography className="info" variant='subtitle1'>N/A</Typography>
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
                            <Typography className="info" variant='subtitle1'>{joined ? joined.split('T')[0] : `N/A`}</Typography>
                        }
                </div>
                <div className='user-detail'>
                    <CreateIcon fontSize="small" />
                    {
                        <Button component={Link} to={user_id ? '/find' : '/signin'} className="review-button" color="primary">Write review</Button>
                    } 
                </div>
            </Paper>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    requestUserStart: currentUserToken => dispatch(requestUserStart(currentUserToken)),
});

export default connect(null, mapDispatchToProps)(UserProfile);