import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEditProfilePending, selectEditProfileErr, selectUpdateAvatarErr } from '../../redux/user/user-selectors';

import Uploader from '../uploading/uploading-component';
import EditProfile from '../edit-profile/edit-profile-component';
import UploadAvatar from '../upload-avatar/upload-avatar-component';
import AlertMessage from '../alert-message/alert-message-component';
import { Button, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import './user-profile-style.scss';

const UserProfile = ({ user: { user_id, public_name, avatar, contributions, location, joined }, editProfilePending, editProfileErr, updateAvatarErr }) => {

    const [openEditProfile, setEditProfileOpen] = useState(false);

    const handleEditProfileClick = () => {
        setEditProfileOpen(true);
    };

    const handleEditProfileClose = () => {
        setEditProfileOpen(false);
    };

    return (
        <div className='user-profile-page'>
            {
                editProfileErr.length || updateAvatarErr.length ? <AlertMessage severity="error" errMsg={editProfileErr.length ? editProfileErr : updateAvatarErr} /> : null
            }
            <Paper className='profile-header'>
                <div className='profile-header-1'>
                    <div className='user-avatar'>
                        <UploadAvatar userId={user_id} avatar={avatar} />
                    </div>
                    <div className='user-info'>
                        <Typography variant='h6' gutterBottom >{public_name}</Typography>
                        <Typography variant='subtitle1' >Contributions</Typography>
                        <Typography variant='subtitle1' color='textSecondary'>{contributions}</Typography>
                    </div>
                </div>
                <div className='profile-header-2'>
                    <Button className="update-button" variant="contained" color="primary" onClick={handleEditProfileClick}>
                        Update Profile
                    </Button>
                    <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={handleEditProfileClose} />
                </div>
            </Paper>
            <Paper className='profile-body'>
                <div className='user-detail'>
                    <LocationOnIcon fontSize="small" />
                    {
                        location ? (
                            <Typography className="info" variant='subtitle1'>{location}</Typography>
                        ) : (
                            <>
                                <Button className="review-button" color="primary" onClick={handleEditProfileClick}>
                                    Add your current city
                                </Button>
                                <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={handleEditProfileClose} />
                            </>
                        )
                    }
                </div>
                <div className='user-detail'>
                    <EventIcon fontSize="small" />
                    <Typography className="info" variant='subtitle1'>{joined.split('T')[0]}</Typography>
                </div>
                <div className='user-detail'>
                    <CreateIcon fontSize="small" />
                    <Button component={Link} to={user_id ? '/find' : '/signin'} className="review-button" color="primary">Write review</Button>
                </div>
            </Paper>
            {
                editProfilePending ? <Uploader /> : null
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    editProfilePending: selectEditProfilePending,
    editProfileErr: selectEditProfileErr,
    updateAvatarErr: selectUpdateAvatarErr
});

export default connect(mapStateToProps)(UserProfile);