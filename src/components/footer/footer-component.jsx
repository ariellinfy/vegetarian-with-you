import React from 'react';
import { Typography, Link } from '@material-ui/core';
import './footer-style.scss';

const Footer = () => {
    return (
        <footer className='footer-container'>
            <Typography className='footer-content' component="p" variant="subtitle1">
                <i className="fa fa-copyright"></i>
                2021 
                <Link href='https://ariellinfy.com/' target="_blank" rel="noopener" className='footer-link'>Ariel Lin</Link>
                Made with Love 
                <i className="fa fa-heart"></i>    
            </Typography>
        </footer>
    )
};

export default Footer;