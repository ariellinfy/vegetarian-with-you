import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editProfileStart } from '../../redux/user/user-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginRight: '20px',
      marginTop: '15px'
    },
    actions: {
        padding: '8px 32px 24px 0',
    }
}));

const EditProfile = ({ publicName, location, open, handleClose, editProfileStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    if (!location) {
        location = "";
    }
    const [userInfo, setProfile] = useState({
        name: publicName,
        city: location
    })
    const { name, city } = userInfo;

    const handleSubmit = event => {
        event.preventDefault();
        editProfileStart({ name, city, currentUserToken });
    }
    
    const handleChange = event => {
        const { value, name } = event.target;
        setProfile({ ...userInfo, [name]: value });
    }

    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Edit Profile</DialogTitle>
                <Divider />
                <form className='edit-profile-form' onSubmit={handleSubmit}>
                    <DialogContent className={classes.root}>
                        <Avatar className={classes.large} >H</Avatar>
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

export default connect(null, mapDispatchToProps)(EditProfile);