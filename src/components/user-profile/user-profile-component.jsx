import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { uploadAvatarFailure } from '../../redux/user/user-actions';

import EditProfile from '../../components/edit-profile/edit-profile-component';
import UploadAvatar from '../../components/upload-avatar/upload-avatar-component';
import { Avatar, Button, Paper, Typography, Menu, MenuItem } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import './user-profile-style.scss';

const UserProfile = ({ user: { user_id, public_name, avatar, contributions, location, joined, uploadAvatarFailure } }) => {

    const [openEditProfile, setEditProfileOpen] = useState(false);
    const [openUploadAvatar, setUploadAvatarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userAvatar, setAvatar] = useState(avatar);

    const onChangeFile = event => {
        const imageFile = event.target.files[0];
        console.log(imageFile);

        if (!imageFile) {
            uploadAvatarFailure('Please select an image.')
          return false;
        }
        if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            uploadAvatarFailure('File type must be .jpg/jpeg or .png')
          return false;
        } else {
            setAvatar(URL.createObjectURL(imageFile));
            setUploadAvatarOpen(true);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setAnchorEl(null);
    };

    return (
        <div className='user-profile-page'>
            <Paper className='profile-header'>
                <div className='profile-header-1'>
                    <div className='user-avatar'>
                        {
                            userAvatar ? <img className='img-avatar' alt={public_name} src={userAvatar} /> : <Avatar className='font-avatar'>{public_name[0].toUpperCase()}</Avatar>
                        }
                        <div className='avatar-edit-container'>
                            <Button
                                aria-controls="edit-avatar"
                                aria-haspopup="true"
                                variant="outlined"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                                size="small"
                                className='avatar-edit-btn'
                            >
                                Edit
                            </Button>
                            <Menu
                                id="edit-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                >
                                <MenuItem onClick={() => setAnchorEl(null)} className='avatar-edit-option'>
                                    <input 
                                        accept="image/*" 
                                        id="upload-avatar"
                                        type="file" 
                                        name='avatar'
                                        style={{display:"none"}}
                                        onChange={onChangeFile}
                                    />
                                    <label htmlFor="upload-avatar">
                                        Upload a photo
                                    </label>  
                                </MenuItem>
                                <MenuItem onClick={handleRemoveAvatar} className='avatar-edit-option'>Remove photo</MenuItem>
                            </Menu>
                        </div>
                        <UploadAvatar avatar={userAvatar} open={openUploadAvatar} handleClose={() => setUploadAvatarOpen(false)} />
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
                            <Button className="update-button" variant="contained" color="primary" onClick={() => setEditProfileOpen(true)}>
                                Update Profile
                            </Button>
                            <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={() => setEditProfileOpen(false)} />
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
                                    <Button className="review-button" color="primary" onClick={() => setEditProfileOpen(true)}>
                                        Add your current city
                                    </Button>
                                    <EditProfile publicName={public_name} location={location} open={openEditProfile} handleClose={() => setEditProfileOpen(false)} />
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

const mapDispatchToProps = dispatch => ({
    uploadAvatarFailure: error => dispatch(uploadAvatarFailure(error))
});

export default React.memo(connect(null, mapDispatchToProps)(UserProfile));