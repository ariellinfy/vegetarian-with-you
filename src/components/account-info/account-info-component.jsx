import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEditEmailStatus, selectUpdateEmailPending, selectUpdateEmailErr, selectResetPasswordPending, selectResetPasswordErr, selectCloseAccountPending, selectCloseAccountErr } from '../../redux/user/user-selectors';
import { onEditUserEmail, updateEmailStart } from '../../redux/user/user-actions';

import Uploader from '../uploading/uploading-component';
import UpdatePassword from '../update-password/update-password-component';
import CloseAccount from '../close-account/close-account-component';
import AlertMessage from '../alert-message/alert-message-component';
import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';
import './account-info-style.scss';

const AccountInfo = ({ user: { email }, editEmailStatus, onEditUserEmail, updateEmailStart,
    updateEmailPending, updateEmailErr, resetPasswordPending, resetPasswordErr, closeAccountPending, closeAccountErr }) => {

    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        updateEmailStart({ email, userEmail, currentUserToken });
        onEditUserEmail();
        setUserEmail('');
    };

    const handleEditClick = () => {
        onEditUserEmail();
        setUserEmail('');
    };
    
    const handleChange = event => {
        setUserEmail(event.target.value);
    };

    const [openResetPassword, setPassword] = useState(false);
    const handleClickOpenPassword = () => {
        setPassword(true);
    };
    const handleClosePassword = () => {
        setPassword(false);
    };

    const [openCloseAccount, setOpenAccount] = useState(false);
    const handleClickOpenAccount = () => {
        setOpenAccount(true);
    };
    const handleCloseAccount = () => {
        setOpenAccount(false);
    };

    return (
        <div className='account-info-page'>
            {
                updateEmailErr.length || resetPasswordErr.length || closeAccountErr.length ? 
                <AlertMessage severity="error" errMsg={updateEmailErr.length ? updateEmailErr : (resetPasswordErr.length ? resetPasswordErr : closeAccountErr) } /> 
                : null
            }
            <Paper className='user-credentials'>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Email</Typography>
                        <div className='credential-content'>
                            {  
                                !editEmailStatus ? (
                                    <>
                                        <Typography className='credential' variant='body1' >{email}</Typography>
                                        <Button className='credential-btn' size='small' variant="contained" color="secondary" onClick={handleEditClick}>
                                            {
                                                updateEmailPending ? <CircularProgress size={15} /> : 'Edit'
                                            }
                                        </Button>
                                    </>
                                ) : (
                                    <form className='edit-name-form' onSubmit={handleSubmit}>
                                        <TextField
                                            className='credential'
                                            label=""
                                            type="text"
                                            name='userEmail' 
                                            value={userEmail} 
                                            margin="none"
                                            size="small"
                                            required
                                            onChange={handleChange}
                                        />
                                        <div className='btn-group'>
                                            <Button className='credential-btn' size='small' variant="contained" color="secondary" onClick={handleEditClick}>Cancel</Button>
                                            <Button className='credential-btn' size='small' variant="contained" color="secondary" type='submit' disabled = {userEmail.length ? false : true}>Save</Button>
                                        </div>
                                    </form>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Password</Typography>
                        <div className='credential-content'>
                            <Typography className='credential' variant='body1'>********</Typography>
                            <Button className='credential-btn reset-btn' size='small' variant="outlined" color="secondary" onClick={handleClickOpenPassword}>
                                {
                                    resetPasswordPending ? <CircularProgress size={15} /> : 'Reset'
                                }
                            </Button>
                            <UpdatePassword email={email} open={openResetPassword} handleClose={handleClosePassword} />
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className='deactivate-account'>
                <Typography className='deactivate-title' variant='body1'>Close Account</Typography>
                <Typography className='deactivation' variant='body1' >Once you close your account, all information will be trashed, there is no way to go back. Please be certain.</Typography>
                <Button name='deactivateAccount' className='deactivate-btn' size='small' variant="contained" color="secondary" onClick={handleClickOpenAccount} disabled = {closeAccountPending ? true : false}>Close your account</Button>
                <CloseAccount email={email} open={openCloseAccount} handleClose={handleCloseAccount} />
            </Paper>
            {
                closeAccountPending ? <Uploader /> : null
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    editEmailStatus: selectEditEmailStatus,
    updateEmailPending: selectUpdateEmailPending,
    updateEmailErr: selectUpdateEmailErr,
    resetPasswordPending: selectResetPasswordPending,
    resetPasswordErr: selectResetPasswordErr, 
    closeAccountPending: selectCloseAccountPending,
    closeAccountErr: selectCloseAccountErr
});

const mapDispatchToProps = dispatch => ({
    onEditUserEmail: () => dispatch(onEditUserEmail()),
    updateEmailStart: userInfo => dispatch(updateEmailStart(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);