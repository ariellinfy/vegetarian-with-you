import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import './footer-style.scss';

const useStyles = makeStyles(() => ({
    footer: {
        top: 'auto',
        bottom: 0,
        height: '10vh',
        minHeight: '3.5rem',
        padding: '1.3em 0',
        background: '#37474F',
      },
  }));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className='footer-container'>
            <BottomNavigation position="fixed" className={classes.footer}>
                <p className='footer-content'>
                    <i className="fa fa-copyright"></i>
                    2021 <Link href='https://ariellinfy.com/' target="_blank" rel="noopener" className='footer-link'>Ariel Lin</Link>
                    Made with Love <i className="fa fa-heart"></i>    
                </p>
            </BottomNavigation>
        </div>
    )
}

export default Footer;