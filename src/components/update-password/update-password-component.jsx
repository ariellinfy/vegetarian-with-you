import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPasswordStart, resetPasswordFailure } from '../../redux/user/user-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        margin: '10px 0.5em 10px 0'
    },
    text: {
        fontSize: '17px',
        marginTop: '0.5em',
        marginBottom: '0.25em'
    },
    actions: {
        padding: '8px 24px 24px 24px',
    }
}));

const UpdatePassword = ({ email, open, handleClose, resetPasswordStart, resetPasswordFailure }) => {
    const classes = useStyles();
    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    const [userPassword, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const { oldPassword, newPassword, confirmNewPassword } = userPassword;

    const regPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/g);
    let validPassword = false;
    validPassword = regPassword.test(newPassword);

    const handleSubmit = event => {
        event.preventDefault();
        resetPasswordStart({ email, oldPassword, newPassword, currentUserToken });
        setPassword({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        });
    };
    
    const handleChange = event => {
        const { value, name } = event.target;
        setPassword({ ...userPassword, [name]: value });
    };

    return (
        <div className='edit-profile-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="update-password-title">Update Password</DialogTitle>
                <Divider />
                <form className='reset_password-form' onSubmit={handleSubmit}>
                    <DialogContent>
                        <div className={classes.inputContainer}>
                            <TextField
                                className={classes.input}
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
                            {
                                oldPassword.length ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                            }
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField
                                className={classes.input}
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
                            {
                                validPassword ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                            }
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField
                                className={classes.input}
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
                            {
                                newPassword === confirmNewPassword && newPassword.length ? <CheckCircleRoundedIcon color="primary" /> : <CancelIcon color="secondary" />
                            }   
                        </div>
                        <DialogContentText className={classes.text}>
                            Make sure the password is at least 8 characters including at least one number, one uppercase letter, one lowercase letter and one special character.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit" disabled = {oldPassword.length && validPassword && newPassword === confirmNewPassword ? false : true}>
                            Update password
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    resetPasswordStart: userInfo => dispatch(resetPasswordStart(userInfo)),
    resetPasswordFailure: error => dispatch(resetPasswordFailure(error))
});

export default connect(null, mapDispatchToProps)(UpdatePassword);