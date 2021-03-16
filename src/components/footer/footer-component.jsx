import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Link } from '@material-ui/core';
import './footer-style.scss';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        height: '4rem',
        padding: '1.3em 0'
      },
  }));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className='footer-container'>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <div className='footer-content'>
                    <i className="fa fa-copyright"></i>
                    2021 <Link href='https://ariellinfy.com/' target="_blank" rel="noopener" className='footer-link'>Ariel Lin</Link>
                    Made with Love <i className="fa fa-heart"></i>    
                </div>
            </AppBar>
        </div>
    )
}

export default Footer;