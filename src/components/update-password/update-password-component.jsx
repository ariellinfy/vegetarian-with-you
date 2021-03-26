import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetPasswordStart } from '../../redux/user/user-actions';
import { selectUserToken } from '../../redux/user/user-selectors';
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

const UpdatePassword = ({ email, open, handleClose, resetPasswordStart, currentUserToken }) => {
    const classes = useStyles();

    const [userPassword, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const { oldPassword, newPassword, confirmNewPassword } = userPassword;

    const handleSubmit = event => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("Passwords don't match");
            return;
        };
        resetPasswordStart({ email, oldPassword, newPassword, currentUserToken });
        setPassword({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        });
    }
    
    const handleChange = event => {
        const { value, name } = event.target;
        setPassword({ ...userPassword, [name]: value });
    }

    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Update Password</DialogTitle>
                <Divider />
                <form className='reset_password-form' onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            id="old-password"
                            label="Old Password"
                            type="password"
                            name='oldPassword' 
                            value={oldPassword} 
                            variant="outlined"
                            margin="normal"
                            fullWidth required
                            onChange={handleChange}
                        />
                        <TextField
                            id="new-password"
                            label="New Password"
                            type="password"
                            name='newPassword' 
                            value={newPassword} 
                            variant="outlined"
                            margin="normal"
                            fullWidth required
                            onChange={handleChange}
                        />
                        <TextField
                            id="confirm-password"
                            label="Confirm New Password"
                            type="password"
                            name='confirmNewPassword' 
                            value={confirmNewPassword} 
                            variant="outlined"
                            margin="normal"
                            fullWidth required
                            onChange={handleChange}
                        />
                        <DialogContentText className={classes.text}>
                            Make sure the password is at least 8 characters including a number and an uppercase letter.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit">
                            Update password
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUserToken: selectUserToken
});

const mapDispatchToProps = dispatch => ({
    resetPasswordStart: userCredential => dispatch(resetPasswordStart(userCredential))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);