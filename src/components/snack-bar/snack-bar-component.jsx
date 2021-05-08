import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { resetUserStatusMessage } from '../../redux/user/user-actions';
import { resetReviewStatusMessage } from '../../redux/review/review-actions';

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

const Toast = ({ successMessage, errorMessage, resetUserStatusMessage, resetReviewStatusMessage }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const updateMessage = useCallback(() => {
        const messageTimeout = setTimeout(() => {
            resetUserStatusMessage();
            resetReviewStatusMessage();
            clearTimeout(messageTimeout);
        }, 6000);
    }, [resetUserStatusMessage, resetReviewStatusMessage]);
    
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
                successMessage.length ? (
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
                        <Alert variant="filled" elevation={6} severity='success' onClose={handleClose}>
                            {successMessage}
                        </Alert>
                    </Snackbar>
                ) : null
            }
            {
                errorMessage.length ? (
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
                        <Alert variant="filled" elevation={6} severity='error' onClose={handleClose}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                ) : null
            }
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    resetUserStatusMessage: () => dispatch(resetUserStatusMessage()),
    resetReviewStatusMessage: () => dispatch(resetReviewStatusMessage())
});

export default connect(null, mapDispatchToProps)(Toast);
