import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart, resetUserUpdateStatus } from '../../redux/user/user-actions';
import { selectUpdateAvatarPending } from '../../redux/user/user-selectors';

import UserAvatar from '../user-avatar/user-avatar-component';
import { Menu, MenuItem, Button, CircularProgress } from '@material-ui/core';
import './upload-avatar-style.scss';

const UploadAvatar = ({ userId, avatar,
    updateAvatarPending, uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart, resetUserUpdateStatus }) => {
    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    const [anchorEl, setAnchorEl] = useState(null);
    const [uploadAvatar, setUploadAvatar] = useState(avatar);
    const [avatarOnChange, setAvatarOnChange] = useState(false);

    // const onChangeFile = event => {
    //     const imageFile = event.target.files[0];
    //     
    //     if (!imageFile) {
    //         uploadAvatarFailure('Please select an image.');
    //         setAvatarOnChange(false);
    //         return false;
    //     };
    //     if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    //         uploadAvatarFailure('File type must be .jpg/jpeg or .png');
    //         setAvatarOnChange(false);
    //         return false;
    //     } else {
    //         resetUserUpdateStatus();
    //         setUploadAvatar(URL.createObjectURL(imageFile));
    //         setUploadAvatarOpen(true);
    //     };
    // };

    const handleRemoveAvatar = () => {
        setAvatarOnChange(true);
        deleteAvatarStart({ avatar, currentUserToken });
        setAnchorEl(null);
        setAvatarOnChange(false);
    };

    const showWidget = () => {
        setAvatarOnChange(true);
        avatarWidget.open();
        setAnchorEl(null);
    };
    
    let generateSignature = async function (callback, params_to_sign) {
        try {
            const url = 'http://localhost:5000/users/generatesignature';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${currentUserToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    params_to_sign
                })
            });
            const data = await response.json();
            if (data.signature) {
                callback(data.signature);
            };
        } catch (error) {
            console.log(error);
        }
    };

    const uploadSettings = {
        apiKey : "225325956632848",
        cloudName: 'alinfy', 
        uploadPreset: 'vwy-user-avatar-preset', 
        publicId: userId,
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        resourceType: 'image'
    };

    const avatarWidget = window.cloudinary.createUploadWidget({
        ...uploadSettings,        
        uploadSignature: generateSignature,
        },
        (error, result) => { 
            if (error) {
                console.log(error);
            }
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
                setUploadAvatar(result.info);
                uploadAvatarStart({ uploadAvatar: result.info, currentUserToken });
                setAvatarOnChange(false);
            }
        }
    );

    return (
        <div className='upload-avatar-container'>
            <UserAvatar avatar={uploadAvatar} />
            <div className='avatar-edit-container'>
                <Button
                    aria-controls="edit-avatar"
                    aria-haspopup="true"
                    variant="outlined"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    size="small"
                    className='avatar-edit-btn'
                >
                    {
                        (avatarOnChange || updateAvatarPending) ? <CircularProgress size={15} /> : 'Edit'
                    }
                </Button>
                <Menu
                    id="edit-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    >
                    <MenuItem id="upload_widget" onClick={showWidget} className='avatar-edit-option'>
                        Upload a photo
                    </MenuItem>
                    <MenuItem onClick={handleRemoveAvatar} className='avatar-edit-option'>Remove photo</MenuItem>
                </Menu>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    updateAvatarPending: selectUpdateAvatarPending,
});

const mapDispatchToProps = dispatch => ({
    uploadAvatarStart: userInfo => dispatch(uploadAvatarStart(userInfo)),
    uploadAvatarFailure: error => dispatch(uploadAvatarFailure(error)),
    deleteAvatarStart: userInfo => dispatch(deleteAvatarStart(userInfo)),
    resetUserUpdateStatus: () => dispatch(resetUserUpdateStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);