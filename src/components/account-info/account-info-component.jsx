import React, { useState } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import UpdatePassword from '../../components/update-password/update-password-component';
import CloseAccount from '../../components/close-account/close-account-component';
import './account-info-style.scss';

const AccountInfo = () => {
    const [ userCredential, setCredential ] = useState({
        email: 'ariellinfy@gmail.com',
        password: 'abc123'
    })

    const { email, password } = userCredential;

    const [open1, setOpen1] = useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    const [open2, setOpen2] = useState(false);
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    return (
        <div className='account-info-page'>
            <Paper className='user-credentials'>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Email</Typography>
                        <Typography className='credential' variant='subtitle1' >{email}</Typography>
                    </div>
                    <Button className='credential-btn' size='small' variant="contained" color="secondary">Save</Button>
                </div>
                <div className='credential-box'>
                    <div className='user-credential'>
                        <Typography className='credential-title' variant='body1'>Password</Typography>
                        <Typography className='credential' variant='subtitle1' >{password}</Typography>
                    </div>
                    <Button className='credential-btn reset-btn' size='small' variant="outlined" color="secondary" onClick={handleClickOpen1}>Reset password</Button>
                    <UpdatePassword open={open1} handleClose={handleClose1} />
                </div>
            </Paper>
            <Paper className='deactivate-account'>
                <Typography className='deactivate-title deactivation' variant='body1'>Close Account</Typography>
                <Typography className='deactivation' variant='subtitle1' >Once you close your account, all information will be trashed, there is no way to go back. Please be certain.</Typography>
                <Button name='deactivateAccount' className='deactivate-btn' size='small' variant="contained" color="secondary" onClick={handleClickOpen2}>Close your account</Button>
                <CloseAccount open={open2} handleClose={handleClose2} />
            </Paper>
        </div>
    )
}

export default AccountInfo;