import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { resetStatusMessage } from '../../redux/user/user-actions';

import Alert from '@material-ui/lab/Alert';
import { Snackbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const Toast = ({ authSuccessMessage, authErrorMessage, resetStatusMessage }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    let messageTimeout = null;

    const updateMessage = () => {
        messageTimeout = setTimeout(() => {
            resetStatusMessage();
            clearTimeout(messageTimeout);
        }, 6000);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        updateMessage();
    }, [updateMessage]);
    
    return (
        <div className={classes.root}>
            {
                authSuccessMessage.length ? (
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
                        <Alert variant="filled" elevation={6} severity='success' onClose={handleClose}>
                            {authSuccessMessage}
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                authErrorMessage.length ? (
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
                        <Alert variant="filled" elevation={6} severity='error' onClose={handleClose}>
                            {authErrorMessage}
                        </Alert>
                    </Snackbar>
                ) : null
            }
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    resetStatusMessage: () => dispatch(resetStatusMessage()),
});

export default connect(null, mapDispatchToProps)(Toast);
