import React from 'react';

import ErrorImg from '../../assets/under-construction.svg'
import './error-boundary-style.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        //process the error
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='error-boundary-container'>
                    <img src={ErrorImg} alt='error default' />
                    <p>Sorry this page is broken. We are fixing the issues and will return to normal as soon as possible. Thank you for your patience.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;