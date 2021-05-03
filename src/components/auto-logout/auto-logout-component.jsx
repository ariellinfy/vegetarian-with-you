import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user-actions';

const SessionTimeout = ({ currentUser, signOutStart }) => {
    let currentUserToken = '';
    let isAuthenticated = false;

    if (Object.keys(currentUser).length) {
        currentUserToken = localStorage.getItem('token');
        isAuthenticated = true;
    };
    console.log(isAuthenticated, currentUser);

    const [events, setEvents] = useState(['mousedown', 'click', 'load', 'scroll', 'keydown']);
    const [isOpen, setOpen] = useState(false);
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
                // alert("You will be logged out automatically in 1 minute.");
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
        setOpen(false);
    }, [isAuthenticated]);

    const handleClose = () => {
        setOpen(false);
        resetTimer();
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
    
    return isOpen ? <Fragment /> : null;
};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({
    signOutStart: currentUserToken => dispatch(signOutStart(currentUserToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionTimeout);