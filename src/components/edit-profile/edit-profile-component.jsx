import React from 'react';
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

const EditProfile = ({ publicName, location, open, handleClose }) => {
    const classes = useStyles();
    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Edit Profile</DialogTitle>
                <Divider />
                <DialogContent className={classes.root}>
                    <Avatar className={classes.large} >H</Avatar>
                    <div>
                        <TextField
                            defaultValue={publicName}
                            id="name"
                            label="Name"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            defaultValue={location}
                            id="location"
                            label="Current City"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                    </div>
                    
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditProfile;