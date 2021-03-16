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

const CloseAccount = ({ open, handleClose }) => {
    const classes = useStyles();
    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Close Account</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <DialogContentText className={classes.text}>
                        The account will be closed once you confirm the password.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Close account
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CloseAccount;