import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEditEmailStatus, selectUpdateEmailPending, selectResetPasswordPending, selectCloseAccountPending } from '../../redux/user/user-selectors';
import { onEditUserEmail, updateEmailStart } from '../../redux/user/user-actions';

import Uploader from '../uploading/uploading-component';
import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';
import UpdatePassword from '../update-password/update-password-component';
import CloseAccount from '../close-account/close-account-component';
import './account-info-style.scss';

const AccountInfo = ({ user: { email }, editEmailStatus, updateEmailPending, resetPasswordPending, closeAccountPending, onEditUserEmail, updateEmailStart }) => {
    const currentUserToken = localStorage.getItem('token');

    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        updateEmailStart({ email, userEmail, currentUserToken });
        onEditUserEmail();
    };

    const handleEditClick = () => {
        onEditUserEmail();
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
            <Paper className='user-credentials'>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Email</Typography>
                        {
                            email ? (
                                !editEmailStatus ? (
                                    <div className='credential-content'>
                                        <Typography className='credential' variant='body1' >{email}</Typography>
                                        <Button className='credential-btn' size='small' variant="contained" color="secondary" onClick={handleEditClick}>
                                            {
                                                updateEmailPending ? <CircularProgress size={15} /> : 'Edit'
                                            }
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='credential-content'>
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
                                                <Button className='credential-btn' size='small' variant="contained" color="secondary" type='submit'>Save</Button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            ) : (
                                <Typography className='credential' variant='body1' >N/A</Typography>
                            )
                        }
                    </div>
                </div>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Password</Typography>
                        {
                            email ? (
                                <div className='credential-content'>
                                    <Typography className='credential' variant='body1'>********</Typography>
                                    <Button className='credential-btn reset-btn' size='small' variant="outlined" color="secondary" onClick={handleClickOpenPassword}>
                                        {
                                            resetPasswordPending ? <CircularProgress size={15} /> : 'Reset'
                                        }
                                    </Button>
                                    <UpdatePassword email={email} open={openResetPassword} handleClose={handleClosePassword} />
                                </div>
                            ) : (
                                <Typography className='credential' variant='body1'>N/A</Typography>
                            )
                        }
                    </div>
                </div>
            </Paper>
            {
                email ? (
                    <Paper className='deactivate-account'>
                        <Typography className='deactivate-title' variant='body1'>Close Account</Typography>
                        <Typography className='deactivation' variant='body1' >Once you close your account, all information will be trashed, there is no way to go back. Please be certain.</Typography>
                        <Button name='deactivateAccount' className='deactivate-btn' size='small' variant="contained" color="secondary" onClick={handleClickOpenAccount} disabled = {closeAccountPending ? true : false}>Close your account</Button>
                        <CloseAccount email={email} open={openCloseAccount} handleClose={handleCloseAccount} />
                    </Paper>
                ) : (
                    null
                )
            }
            {
                closeAccountPending ? <Uploader /> : null
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    editEmailStatus: selectEditEmailStatus,
    updateEmailPending: selectUpdateEmailPending,
    resetPasswordPending: selectResetPasswordPending,
    closeAccountPending: selectCloseAccountPending
});

const mapDispatchToProps = dispatch => ({
    onEditUserEmail: () => dispatch(onEditUserEmail()),
    updateEmailStart: userInfo => dispatch(updateEmailStart(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);