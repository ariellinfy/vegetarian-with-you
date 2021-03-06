import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { signOutStart, refreshTokenStart } from '../../redux/user/user-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'grey',
        marginTop: '0.5em',
        marginBottom: '0.25em'
    },
    actions: {
        padding: '8px 24px 16px 24px',
    }
}));

const SessionTimeout = ({ currentUser, signOutStart, refreshTokenStart }) => {
    const classes = useStyles();
    let currentUserToken = '';
    let isAuthenticated = false;
    let tokenExp = 0;

    if (Object.keys(currentUser).length) {
        currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;
        isAuthenticated = true;
        tokenExp = parseInt(JSON.parse(localStorage.getItem('userToken')).exp);
    };

    // eslint-disable-next-line
    const [events, setEvents] = useState(['mousedown', 'load', 'scroll', 'keydown']);
    const [warningOpen, setOpen] = useState(false);
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();
    
    let warningInactive = (lastTimeStamp) => {
        clearTimeout(startTimerInterval.current);
        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 20 * 60;
            const popTime = 15 * 60;
            const now = Math.floor(Date.now() / 1000);
            const secPast = now - lastTimeStamp;

            if (5 === tokenExp - now) {
                refreshTokenStart({ currentUserToken });
            };

            if (5 >= tokenExp - now) {
                tokenExp = parseInt(JSON.parse(localStorage.getItem('userToken')).exp);
            };

            if (secPast === popTime) {
                setOpen(true);
            };
    
            if (tokenExp - now <= 0 || secPast === maxTime) {
                setOpen(false);
                signOutStart({ currentUserToken });
                clearInterval(warningInactiveInterval.current);
                isAuthenticated = false;
            };
        }, 1000);
    };
    
    let timeChecker = useCallback(() => {
        startTimerInterval.current = setTimeout(() => {
          let storedTimeStamp = parseInt(sessionStorage.getItem('lastTimeStamp'));
          warningInactive(storedTimeStamp);
        }, 10000);
        // eslint-disable-next-line
    }, []);

    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
        if (isAuthenticated) {
            sessionStorage.setItem('lastTimeStamp', Math.floor(Date.now() / 1000));
            timeChecker();
        };
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const handleClose = () => {
        setOpen(false);
        resetTimer();
    };

    const handleLogout = () => {
        isAuthenticated = false;
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
        signOutStart({ currentUserToken });
        setOpen(false);
    };
    
    useEffect(() => {
        if (isAuthenticated) {
            events.forEach((event) => {
                window.addEventListener(event, resetTimer);
            });
            resetTimer();
        };

        return () => {
            clearTimeout(startTimerInterval.current);
            clearInterval(warningInactiveInterval.current);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer, events, isAuthenticated]);

    return isAuthenticated ? (
            <Dialog open={warningOpen} onClose={handleClose}>
                <DialogTitle id="idle-warning">You Have Been Idle!</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText className={classes.text}>
                        You will be logged out automatically in 5 minutes. Would you want to stay?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={handleLogout} variant="contained" color="secondary">
                        Sign Out
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="primary" type="submit">
                        Stay
                    </Button>
                </DialogActions>
            </Dialog>
    ) : null;
};

const mapDispatchToProps = dispatch => ({
    signOutStart: token => dispatch(signOutStart(token)),
    refreshTokenStart: token => dispatch(refreshTokenStart(token)),
});

export default connect(null, mapDispatchToProps)(SessionTimeout);