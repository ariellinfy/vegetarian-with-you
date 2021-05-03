import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user-actions';

const SessionTimeout = ({ currentUser, signOutStart }) => {
    console.log(currentUser);
    const [authState, setAuth] = useState({
        currentUserToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        isAuthenticated: Object.keys(currentUser).length ? true : false
    });
    const { currentUserToken, isAuthenticated } = authState;

    const [events, setEvents] = useState(['mousedown', 'click', 'load', 'scroll', 'keydown', 'mousemove']);
    const [isOpen, setOpen] = useState(false);
    let timeStamp = 0;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();
    console.log(isAuthenticated);

    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
          let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
          warningInactive(storedTimeStamp);
        }, 5000);
    };

    let warningInactive = (lastTimeStamp) => {
        clearTimeout(startTimerInterval.current);
    
        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 1 * 60;
            const popTime = 0.5 * 60;
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
                events.forEach((event) => {
                    window.removeEventListener(event, resetTimer);
                });
            }
        }, 1000);
    };

    let resetTimer = useCallback(() => {
        console.log('reset timer')
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
    
        if (isAuthenticated) {
            timeStamp = Math.floor(Date.now() / 1000);
            sessionStorage.setItem('lastTimeStamp', timeStamp);
            timeChecker();
        } else {
            console.log(warningInactiveInterval.current);
            clearInterval(warningInactiveInterval.current);
            console.log(sessionStorage.getItem('lastTimeStamp'));
            sessionStorage.removeItem('lastTimeStamp');
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
        setOpen(false);
    }, [isAuthenticated]);

    const handleClose = () => {
        setOpen(false);
        resetTimer();
    };
    
    useEffect(() => {
        console.log('first render');
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });
        return () => {
            console.log('clean up');
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
            clearTimeout(startTimerInterval.current);
            clearInterval(warningInactiveInterval.current);
          //   resetTimer();
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