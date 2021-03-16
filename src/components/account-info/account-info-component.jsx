import React, { useState } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import './account-info-style.scss';

const AccountInfo = () => {
    const [ userCredential, setCredential ] = useState({
        email: 'ariellinfy@gmail.com',
        password: 'abc123'
    })

    const { email, password } = userCredential;

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
                    <Button className='credential-btn reset-btn' size='small' variant="outlined" color="secondary">Reset password</Button>
                </div>
            </Paper>
            <Paper className='deactivate-account'>
                <Typography className='deactivate-title deactivation' variant='body1'>Close Account</Typography>
                <Typography className='deactivation' variant='subtitle1' >Once you close your account, all information will be trashed, there is no way to go back. Please be certain.</Typography>
                <Button className='deactivate-btn' size='small' variant="contained" color="secondary">Close your account</Button>
            </Paper>
        </div>
    )
}

export default AccountInfo;