import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: '16px',
        marginTop: '0.5em',
        marginBottom: '0.25em'
    },
    actions: {
        padding: '8px 24px 16px 24px',
    }
  }));

const UpdatePassword = ({ open, handleClose }) => {
    const classes = useStyles();
    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Update Password</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        id="old-password"
                        label="Old Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="new-password"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="confirm-password"
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <DialogContentText className={classes.text}>
                        Make sure the password is at least 8 characters including a number and an uppercase letter.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Update password
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdatePassword;