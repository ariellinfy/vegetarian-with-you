import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { Avatar, Typography } from '@material-ui/core';
import './user-avatar-style.scss';

const UserAvatar = ({ currentUser }) => {
    const avatar_image = true;
    const user_first = (currentUser.public_name).split(' ')[0];
    const user_last = (currentUser.public_name).split(' ')[1];
    const user_initial = user_last.length ? (user_first[0] + user_last[0]) : user_first[0];

    return (

        <div className='avatar-container'>
            {
                Object.keys(currentUser).length ? (
                    avatar_image ? (<div className='user-photo-avatar'></div>) : (<Avatar className='user-initial-avatar'>{user_initial}</Avatar>)
                ) : (<div className='user-default-avatar'></div>)
                
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserAvatar);