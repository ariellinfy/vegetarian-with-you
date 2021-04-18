import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart } from '../../redux/user/user-actions';

import restaurantImage from "../../assets/background/temp.jpg";
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop-image';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@material-ui/core';
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

const UploadAvatar = ({ avatar, publicName, uploadAvatarStart, uploadAvatarFailure, deleteAvatarStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    console.log(avatar)

    const [uploadAvatar, setAvatar] = useState(null);
    const [openUploadAvatar, setUploadAvatarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onChangeFile = event => {
        const imageFile = event.target.files[0];
        console.log(imageFile);

        if (!imageFile) {
            uploadAvatarFailure('Please select an image.')
          return false;
        }
        if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            uploadAvatarFailure('File type must be .jpg/jpeg or .png')
          return false;
        } else {
            setAvatar(URL.createObjectURL(imageFile));
            setUploadAvatarOpen(true);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(uploadAvatar, croppedAreaPixels);
          console.log('donee', { croppedImage });
          setAvatar(croppedImage);
        } catch (e) {
          console.error(e);
        }
    }, [croppedAreaPixels]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await getCroppedImage();
        console.log(uploadAvatar);
        await uploadAvatarStart({ uploadAvatar, currentUserToken });
    };

    const handleRemoveAvatar = () => {
        deleteAvatarStart();
        setAnchorEl(null);
    };

    return (
        <div className='upload-avatar-container'>
            {
                avatar ? <img className='img-avatar' alt={publicName} src={avatar} /> : <Avatar className='font-avatar'>{publicName[0].toUpperCase()}</Avatar>
            }
            <div className='avatar-edit-container'>
                <Button
                    aria-controls="edit-avatar"
                    aria-haspopup="true"
                    variant="outlined"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    size="small"
                    className='avatar-edit-btn'
                >
                    Edit
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
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                // showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(zoom)}
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

const mapDispatchToProps = dispatch => ({
    uploadAvatarStart: userInfo => dispatch(uploadAvatarStart(userInfo)),
    uploadAvatarFailure: error => dispatch(uploadAvatarFailure(error)),
    deleteAvatarStart: () => dispatch(deleteAvatarStart())
});

export default connect(null, mapDispatchToProps)(UploadAvatar);