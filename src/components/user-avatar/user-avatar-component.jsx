import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { Image, Transformation } from 'cloudinary-react';
import { Avatar } from '@material-ui/core';
import './user-avatar-style.scss';

const UserAvatar = ({ currentUser }) => (
    <div className='avatar-container'>
        {
            Object.keys(currentUser).length ? (
                currentUser.avatar ? (
                    <Image cloud_name='alinfy' publicId={currentUser.avatar.path} secure="true">
                        {
                            currentUser.avatar.coordinates ? 
                                <Transformation quality="60" crop="crop"
                                    x={currentUser.avatar.coordinates.custom[0][0]} y={currentUser.avatar.coordinates.custom[0][1]} 
                                    width={currentUser.avatar.coordinates.custom[0][2]} height={currentUser.avatar.coordinates.custom[0][3]} />
                                : <Transformation quality="60" aspectRatio="1:1" crop="fill" />
                        }
                        <Transformation radius="max" />
                        <Transformation width="140" crop="scale" />
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                ) : <Avatar className='font-avatar'>{currentUser.public_name[0]}</Avatar>
            ) : <Avatar className='user-default-avatar' />
            
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserAvatar);