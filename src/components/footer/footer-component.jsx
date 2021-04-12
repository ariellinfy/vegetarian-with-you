import React from 'react';
import { Link } from '@material-ui/core';
import './footer-style.scss';

const Footer = () => {
    return (
        <footer className='footer-container'>
            <p className='footer-content'>
                <i className="fa fa-copyright"></i>
                2021 
                <Link href='https://ariellinfy.com/' target="_blank" rel="noopener" className='footer-link'>Ariel Lin</Link>
                Made with Love 
                <i className="fa fa-heart"></i>    
            </p>
        </footer>
    )
};

export default Footer;