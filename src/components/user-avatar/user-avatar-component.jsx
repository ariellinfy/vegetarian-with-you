import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { Avatar } from '@material-ui/core';
import './user-avatar-style.scss';

const UserAvatar = ({ currentUser, avatar }) => (
    <div className='avatar-container'>
        {
            Object.keys(currentUser).length ? (
                currentUser.avatar ? (<img className='img-avatar' alt={currentUser.public_name} src={`https://vegetarian-with-you-api.herokuapp.com/${avatar}`} />) : (<Avatar className='font-avatar'>{currentUser.public_name[0]}</Avatar>)
            ) : (<Avatar className='user-default-avatar' />)
            
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserAvatar);