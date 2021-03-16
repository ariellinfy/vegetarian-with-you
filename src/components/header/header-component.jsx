import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import './header-style.scss';

const useStyles = makeStyles((theme) => ({
    
  }));

const Header = () => {
    const classes = useStyles();
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
            <AppBar position="static">
                <Toolbar className='header-toolbar'>
                    <i className="fa fa-user-circle"></i>
                    <div className='header-right'>
                        <Button color="primary" className='header-btn'>
                            <i className="fa fa-search"></i>
                            Explore
                        </Button>
                        <Button color="secondary" className='header-btn'>
                            <i className="fa fa-plus"></i>
                            Write review
                        </Button>
                        {auth && (
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
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