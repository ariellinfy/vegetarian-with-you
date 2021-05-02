import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart } from '../../redux/user/user-actions';
import { selectUpdateAvatarPending } from '../../redux/user/user-selectors';

import UserAvatar from '../user-avatar/user-avatar-component';
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop-image';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography, CircularProgress } from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import './upload-avatar-style.scss';

const useStyles = makeStyles((theme) => ({
    content: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    actions: {
        padding: '8px 32px 24px 0',
    }
}));

const UploadAvatar = ({ userId, avatar, updateAvatarPending, uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    const [uploadAvatar, setUploadAvatar] = useState(null);
    let croppedAvatar = null;
    let compressedAvatar = null;
    const [openUploadAvatar, setUploadAvatarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [avatarOnChange, setAvatarOnChange] = useState(false);

    const onChangeFile = event => {
        const imageFile = event.target.files[0];
        setAvatarOnChange(true);

        if (!imageFile) {
            uploadAvatarFailure('Please select an image.');
            return false;
        };
        if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            uploadAvatarFailure('File type must be .jpg/jpeg or .png');
            return false;
        } else {
            setUploadAvatar(URL.createObjectURL(imageFile));
            setUploadAvatarOpen(true);
        };
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = useCallback(async () => {
        try {
            return await getCroppedImg(uploadAvatar, croppedAreaPixels, rotation, `${userId}.jpg`);
        } catch (e) {
          console.error(e);
        }
    }, [croppedAreaPixels]);

    const getCompressedImage = useCallback(async (croppedAvatar, avatarOnChange) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 250,
            useWebWorker: true
        };
        try {
            return await imageCompression(croppedAvatar, options).then(compressedImg => {
                return new File([compressedImg], compressedImg.name, {
                    type: compressedImg.type
                });
            });
        } catch (e) {
            console.error(e);
        }
    }, [croppedAvatar]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        croppedAvatar = await getCroppedImage();
        compressedAvatar = await getCompressedImage(croppedAvatar, avatarOnChange);
        await uploadAvatarStart({ compressedAvatar, currentUserToken });
        setAvatarOnChange(false);
    };

    const handleRemoveAvatar = () => {
        setAvatarOnChange(true);
        deleteAvatarStart({ avatar, currentUserToken });
        setAnchorEl(null);
        setAvatarOnChange(false);
    };

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
                    <MenuItem onClick={() => setAnchorEl(null)} className='avatar-edit-option'>
                        <input 
                            accept="image/*" 
                            id="upload-avatar"
                            type="file" 
                            name='avatar'
                            style={{display:"none"}}
                            onChange={onChangeFile}
                        />
                        <label htmlFor="upload-avatar">
                            Upload a photo
                        </label>  
                    </MenuItem>
                    <MenuItem onClick={handleRemoveAvatar} className='avatar-edit-option'>Remove photo</MenuItem>
                </Menu>
            </div>
            <Dialog open={openUploadAvatar} onClose={() => setUploadAvatarOpen(false)}>
                <DialogTitle>Crop your new profile picture</DialogTitle>
                <Divider />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <DialogContent className={classes.content}>
                        <div className='crop-container'>
                            <Cropper
                                image={uploadAvatar}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className='slider-container'>
                            <Typography variant="overline" className='slider-label'>Zoom</Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                        <div className='slider-container'>
                            <Typography variant="overline" className='slider-label'>Rotation</Typography>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={36}
                                aria-labelledby="Rotation"
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={() => setUploadAvatarOpen(false)} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => setUploadAvatarOpen(false)} variant="contained" color="secondary" type="submit">
                            Upload
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>    
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    updateAvatarPending: selectUpdateAvatarPending
});

const mapDispatchToProps = dispatch => ({
    uploadAvatarStart: userInfo => dispatch(uploadAvatarStart(userInfo)),
    uploadAvatarFailure: error => dispatch(uploadAvatarFailure(error)),
    deleteAvatarStart: userInfo => dispatch(deleteAvatarStart(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);