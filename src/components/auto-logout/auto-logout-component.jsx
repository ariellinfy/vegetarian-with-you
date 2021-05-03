import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user-actions';

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

const SessionTimeout = ({ currentUser, signOutStart }) => {
    const classes = useStyles();
    let currentUserToken = '';
    let isAuthenticated = false;

    if (Object.keys(currentUser).length) {
        currentUserToken = localStorage.getItem('token');
        isAuthenticated = true;
    };
    console.log(isAuthenticated, currentUser);

    const [events, setEvents] = useState(['mousedown', 'load', 'scroll', 'keydown', 'mousemove']);
    const [warningOpen, setOpen] = useState(false);
    let timeStamp = 0;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();
    
    let timeChecker = () => {
        console.log('time check start')
        startTimerInterval.current = setTimeout(() => {
          let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
          warningInactive(storedTimeStamp);
        }, 5000);
    };

    let warningInactive = (lastTimeStamp) => {
        console.log('start warning interval')
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 0.5 * 60;
            const popTime = 0.25 * 60;
            const secPast = Math.floor(Date.now() / 1000) - lastTimeStamp;
            console.log(secPast, lastTimeStamp);

            if (secPast === popTime) {
                console.log('pop');
                setOpen(true);
            };
    
            if (secPast === maxTime) {
                console.log('timeout');
                setOpen(false);
                signOutStart({ currentUserToken });
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');
                isAuthenticated = false;
                return;
            }
        }, 1000);
    };

    let resetTimer = useCallback(() => {
        console.log('reset timer');
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
    
        if (isAuthenticated) {
            timeStamp = Math.floor(Date.now() / 1000);
            sessionStorage.setItem('lastTimeStamp', timeStamp);
            timeChecker();
        };
    }, [isAuthenticated]);

    const handleClose = () => {
        setOpen(false);
        resetTimer();
    };

    const handleLogout = () => {
        console.log('logging out');
        isAuthenticated = false;
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
        signOutStart({ currentUserToken });
        sessionStorage.removeItem('lastTimeStamp');
        setOpen(false);
    };
    
    useEffect(() => {
        console.log('first render');
        if (isAuthenticated) {
            events.forEach((event) => {
                window.addEventListener(event, resetTimer);
            });
        };

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer, events, timeChecker]);
    
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

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({
    signOutStart: currentUserToken => dispatch(signOutStart(currentUserToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionTimeout);