import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editProfileStart } from '../../redux/user/user-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(19),
      height: theme.spacing(19),
      marginRight: '20px',
      marginTop: '15px',
      fontSize: '45px'
    },
    update: {
        marginTop: '-1.85em',
    },
    editBtn: {
        textTransform: 'none',
        background: 'white',
        fontSize: '14px',
        padding: '2px 0',
        '&:hover': {
            background: 'white',
        }
    },
    selectBtn: {
        fontSize: '16px',
        minHeight: '30px'
    },
    actions: {
        padding: '8px 32px 24px 0',
    }
}));

const EditProfile = ({ publicName, location, avatar, open, handleClose, editProfileStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    location = !location ? "" : location;

    const [userInfo, setProfile] = useState({
        name: publicName,
        city: location,
    });
    const { name, city } = userInfo;

    const [userAvatar, setAvatar] = useState(avatar);

    const handleSubmit = event => {
        event.preventDefault();
        editProfileStart({ name, city, currentUserToken });
    };
    
    const handleChange = event => {
        const { value, name } = event.target;
        setProfile({ ...userInfo, [name]: value });
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleAvatarClose = () => {
      setAnchorEl(null);
    };

    const onChangeFile = event => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        setAvatar(URL.createObjectURL(imageFile));
        // if (!imageFile) {
        // //   uploadProfileImageTypeError('Please select an image.')
        //   return false;
        // }
        // if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|HEIC)$/)) {
        // //   uploadProfileImageTypeError('File type must be .jpg/jpeg, .png, .HEIC')
        //   return false;
        // } else {
           
        // //   uploadProfileImage(currentUserToken, imageFile);
        // }
    };
      console.log(userAvatar)


    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-user-info-title">Edit Profile</DialogTitle>
                <Divider />
                <form className='edit-profile-form' onSubmit={handleSubmit}>
                    <DialogContent className={classes.root}>
                        <div className={classes.avatar}>
                            {
                                userAvatar ? <Avatar alt={name} src={userAvatar} /> : <Avatar className={classes.large}>{name[0].toUpperCase()}</Avatar>
                            }
                            <div className={classes.update}>
                                <Button
                                    aria-controls="edit-avatar"
                                    aria-haspopup="true"
                                    variant="outlined"
                                    onClick={handleAvatarClick}
                                    size="small"
                                    className={classes.editBtn}
                                >
                                    Edit
                                </Button>
                                <Menu
                                    id="edit-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleAvatarClose}
                                    >
                                    <MenuItem onClick={handleAvatarClose} className={classes.selectBtn}>
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
                                    <MenuItem onClick={handleAvatarClose} className={classes.selectBtn}>Remove photo</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div>
                            <TextField
                                label="Name"
                                type="text"
                                name='name' 
                                value={name} 
                                variant="outlined"
                                margin="normal"
                                fullWidth required
                                onChange={handleChange}
                            />
                            <TextField
                                label="Current City"
                                type="text"
                                name='city' 
                                value={city} 
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                onChange={handleChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>    
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    editProfileStart: userInfo => dispatch(editProfileStart(userInfo))
});

export default React.memo(connect(null, mapDispatchToProps)(EditProfile));