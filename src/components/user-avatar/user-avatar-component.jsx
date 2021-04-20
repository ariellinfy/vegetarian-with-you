import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectAvatarUrl } from '../../redux/user/user-selectors';

import { Avatar } from '@material-ui/core';
import './user-avatar-style.scss';

const UserAvatar = ({ currentUser, avatarUrl }) => {
    return (
        <div className='avatar-container'>
            {
                Object.keys(currentUser).length ? (
                    currentUser.avatar ? (<img className='img-avatar' alt={currentUser.public_name} src={avatarUrl} />) : (<Avatar className='font-avatar'>{currentUser.public_name[0]}</Avatar>)
                ) : (<Avatar className='user-default-avatar' />)
                
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    avatarUrl: selectAvatarUrl,
});

export default connect(mapStateToProps)(UserAvatar);