import React, { useState } from 'react';
import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import './header-style.scss';

const Header = () => {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='header-container'>
            <AppBar position="static" color="grey">
                <Toolbar className='header-toolbar'>
                    <i className="fa fa-user-circle"></i>
                    <div className='header-right'>
                        <Button color="primary" className='header-btn'>
                            <SearchIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Explore</Typography>
                        </Button>
                        <Button color="primary" className='header-btn'>
                            <AddCircleOutlineIcon />
                            <Typography variant="body1" className='header-btn-label' component='span'>Write review</Typography>
                        </Button>
                        {auth && (
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
                                    open={open}
                                    onClose={handleClose}
                                    style={{ top: '50px' }}
                                >
                                    <MenuItem onClick={handleClose}>View Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>Account Info</MenuItem>
                                    <MenuItem onClick={handleClose}>My Reviews</MenuItem>
                                    <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;