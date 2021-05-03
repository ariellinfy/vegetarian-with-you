import React, { useState } from 'react';
import { connect } from 'react-redux';
import { closeAccountStart } from '../../redux/user/user-actions';

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

const CloseAccount = ({ email, open, handleClose, closeAccountStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    const [confirmPassword, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        closeAccountStart({ email, confirmPassword, currentUserToken });
        setPassword("");
    };
    
    const handleChange = event => {
        setPassword(event.target.value);
    };

    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Close Account</DialogTitle>
                <Divider />
                <form className='reset_password-form' onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            id="confirm-password"
                            label="Confirm Password"
                            type="password"
                            name='confirmPassword' 
                            value={confirmPassword} 
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            onChange={handleChange}
                        />
                        <DialogContentText className={classes.text}>
                            The account will be closed once you confirm the password.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit" disabled = {confirmPassword.length ? false : true}>
                            Close account
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    closeAccountStart: userCredential => dispatch(closeAccountStart(userCredential))
});

export default connect(null, mapDispatchToProps)(CloseAccount);