import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { generateSignatureStart, uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart, resetUserUpdateStatus } from '../../redux/user/user-actions';
import { selectUpdateAvatarPending, selectSignature } from '../../redux/user/user-selectors';

import UserAvatar from '../user-avatar/user-avatar-component';
import { Menu, MenuItem, Button, CircularProgress } from '@material-ui/core';
import './upload-avatar-style.scss';

const UploadAvatar = ({ userId, avatar, uploadSignature, 
    generateSignatureStart, updateAvatarPending, uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart, resetUserUpdateStatus }) => {
    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    const [anchorEl, setAnchorEl] = useState(null);
    const [avatarOnChange, setAvatarOnChange] = useState(false);

    // const onChangeFile = event => {
    //     const imageFile = event.target.files[0];
    //     setAvatarOnChange(true);

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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     croppedAvatar = await getCroppedImage();
    //     compressedAvatar = await getCompressedImage(croppedAvatar, avatarOnChange);
    //     await uploadAvatarStart({ compressedAvatar, currentUserToken });
    //     setAvatarOnChange(false);
    // };

    const handleRemoveAvatar = () => {
        setAvatarOnChange(true);
        deleteAvatarStart({ avatar, currentUserToken });
        setAnchorEl(null);
        setAvatarOnChange(false);
    };

    const showWidget = () => {
        avatarWidget.open();
    };
    
    const generateSignature = () => {
        generateSignatureStart({ 
            uploadPreset: 'vwy-user-avatar-preset', 
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            publicId: userId,
            currentUserToken
        })
    };

    const avatarWidget = window.cloudinary.createUploadWidget({
        apiKey : "225325956632848",
        cloudName: 'alinfy', 
        uploadPreset: 'vwy-user-avatar-preset', 
        uploadSignature: uploadSignature,
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        publicId: userId,
        resourceType: 'image'
        },
        (error, result) => { 
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
            }
        }
    );

    return (
        <div className='upload-avatar-container'>
            <UserAvatar avatar={avatar} />
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
    uploadSignature: selectSignature
});

const mapDispatchToProps = dispatch => ({
    generateSignatureStart: data => dispatch(generateSignatureStart(data)),
    uploadAvatarStart: userInfo => dispatch(uploadAvatarStart(userInfo)),
    uploadAvatarFailure: error => dispatch(uploadAvatarFailure(error)),
    deleteAvatarStart: userInfo => dispatch(deleteAvatarStart(userInfo)),
    resetUserUpdateStatus: () => dispatch(resetUserUpdateStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);