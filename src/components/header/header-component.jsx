import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { signOutStart, setAdminCurrentPage, resetAdminCurrentPage, resetEditUserEmail } from '../../redux/user/user-actions';
import { resetUpdateRestaurantStatus } from '../../redux/restaurant/restaurant-actions';
import { resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestUserReviewsStatus } from '../../redux/review/review-actions';

import UserAvatar from '../user-avatar/user-avatar-component';
import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/logo.png';
import './header-style.scss';

const Header = ({ signOutStart, currentUser, setAdminCurrentPage, resetAdminCurrentPage, resetEditUserEmail, 
    resetUpdateRestaurantStatus, resetCreateReviewStatus, resetUpdateReviewStatus, resetRequestUserReviewsStatus }) => {

    const currentUserToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    
    const [anchorEl, setAnchorEl] = useState(null);

    const [anchorElSmall, setAnchorElSmall] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuSmall = (event) => {
        setAnchorElSmall(event.currentTarget);
    };

    const setCurrentPage = event => {
        if (event.target.text === 'View Profile') {
            setAdminCurrentPage(0);
        } else if (event.target.text === 'Account Info') {
            setAdminCurrentPage(1);
        } else if (event.target.text === 'My Reviews') {
            setAdminCurrentPage(2);
        }
    };
    
    const handleClose = event => {
        setCurrentPage(event);
        setAnchorEl(null);
    };

    const handleCloseSmall = event => {
        setCurrentPage(event);
        setAnchorElSmall(null);
    };

    const handleSignOut = () => {
        resetUpdateRestaurantStatus();
        resetCreateReviewStatus();
        resetUpdateReviewStatus();
        resetRequestUserReviewsStatus();
        resetEditUserEmail();
        resetAdminCurrentPage();
        signOutStart({ currentUserToken });
        setAnchorEl(null);
        setAnchorElSmall(null);
    };

    return (
        <div className='header-container'>
            <AppBar position="static">
                <Toolbar className='header-toolbar'>
                    <Link to='/' className='header-left'>
                        <img src={logo} alt='logo' className='logo' />
                        <Typography variant="body1" color="primary" className='logo-title' component='span'>Vegetarian With You</Typography>
                    </Link>
                    <div className='header-right' id='header-full-screen'>
                        <Button component={Link} to={'/explore'} color="primary" className='header-btn'>
                            <SearchIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Explore</Typography>
                        </Button>
                        <Button component={Link} to={'/find'} color="primary" className='header-btn'>
                            <AddCircleOutlineIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Write review</Typography>
                        </Button>
                        { Object.keys(currentUser).length ? (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="primary"
                                    className='header-setting-btn'
                                >
                                    <UserAvatar avatar={currentUser.avatar} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    style={{ top: '50px' }}
                                >
                                    <MenuItem component={Link} to="/useraccount" page='0' onClick={handleClose}>View Profile</MenuItem>
                                    <MenuItem component={Link} to="/useraccount" page='1' onClick={handleClose}>Account Info</MenuItem>
                                    <MenuItem component={Link} to="/useraccount" page='2' onClick={handleClose}>My Reviews</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button component={Link} to={'/signin'} color="primary" variant="contained" className='header-btn' onClick={handleClose}>
                                <Typography variant="body1" className='header-btn-label' component='span'>Sign In</Typography>
                            </Button>
                        )}
                    </div>
                    <div className='header-right' id='header-small-screen'>
                        { Object.keys(currentUser).length ? (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenuSmall}
                                    color="primary"
                                    className='header-setting-btn'
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElSmall}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElSmall)}
                                    onClose={handleCloseSmall}
                                    style={{ top: '50px' }}
                                >
                                    <MenuItem component={Link} to="/explore" onClick={handleCloseSmall}>Explore</MenuItem>
                                    <MenuItem component={Link} to="/find" onClick={handleCloseSmall}>Write review</MenuItem>
                                    <MenuItem component={Link} to="/useraccount" page='0' onClick={handleCloseSmall}>View Profile</MenuItem>
                                    <MenuItem component={Link} to="/useraccount" page='1' onClick={handleCloseSmall}>Account Info</MenuItem>
                                    <MenuItem component={Link} to="/useraccount" page='2' onClick={handleCloseSmall}>My Reviews</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenuSmall}
                                    color="primary"
                                    className='header-setting-btn'
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElSmall}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElSmall)}
                                    onClose={handleCloseSmall}
                                    style={{ top: '50px' }}
                                >
                                    <MenuItem component={Link} to="/explore" onClick={handleCloseSmall}>Explore</MenuItem>
                                    <MenuItem component={Link} to="/signin" onClick={handleCloseSmall}>Sign In</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    signOutStart: token => dispatch(signOutStart(token)),
    setAdminCurrentPage: pageNumber => dispatch(setAdminCurrentPage(pageNumber)),
    resetAdminCurrentPage: () => dispatch(resetAdminCurrentPage()),
    resetEditUserEmail: () => dispatch(resetEditUserEmail()),
    resetUpdateRestaurantStatus: () => dispatch(resetUpdateRestaurantStatus()),
    resetCreateReviewStatus: () => dispatch(resetCreateReviewStatus()),
    resetUpdateReviewStatus: () => dispatch(resetUpdateReviewStatus()),
    resetRequestUserReviewsStatus: () => dispatch(resetRequestUserReviewsStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);