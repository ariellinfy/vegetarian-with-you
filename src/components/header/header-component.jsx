import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectUserToken } from '../../redux/user/user-selectors';
import { signOutStart } from '../../redux/user/user-actions';

import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/logo.png';
import './header-style.scss';

const Header = ({ currentUserToken, signOutStart }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOutStart({ currentUserToken });
    };

    return (
        <div className='header-container'>
            <AppBar position="static" color="inherit">
                <Toolbar className='header-toolbar'>
                    <Link to='/' className='header-left'>
                        <img src={logo} alt='logo' className='logo' />
                        <Typography variant="body1" color="primary" className='logo-title' component='span'>Vegetarian With You</Typography>
                    </Link>
                    <div className='header-right'>
                        <Button color="primary" className='header-btn'>
                            <SearchIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Explore</Typography>
                        </Button>
                        <Button color="primary" className='header-btn'>
                            <AddCircleOutlineIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Write review</Typography>
                        </Button>
                        { currentUserToken.length ? (
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
                                    <i className="fa fa-user-circle"></i>
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
                                    <MenuItem component={Link} to="/useraccount" onClick={handleClose}>View Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>Account Info</MenuItem>
                                    <MenuItem onClick={handleClose}>My Reviews</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Link to='/signin' className='redirect-btn'> 
                                <Button color="primary" variant="contained" className='header-btn' onClick={handleClose}>
                                    <Typography variant="body1" className='header-btn-label' component='span'>Sign In</Typography>
                                </Button>
                            </Link>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUserToken: selectUserToken
});

const mapDispatchToProps = dispatch => ({
    signOutStart: token => dispatch(signOutStart(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);