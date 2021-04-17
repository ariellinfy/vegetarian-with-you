import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { uploadAvatarStart } from '../../redux/user/user-actions';

import restaurantImage from "../../assets/background/temp.jpg";
import Cropper from 'react-easy-crop';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@material-ui/core';
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

const UploadAvatar = ({ avatar, open, handleClose, uploadAvatarStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    console.log(avatar)

    const [userAvatar, setAvatar] = useState(avatar);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        uploadAvatarStart({ userAvatar, currentUserToken });
    };

    return (
        <div className='upload-avatar-form'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={classes.title}>Crop your new profile picture</DialogTitle>
                <Divider />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <DialogContent className={classes.content}>
                        <div className={classes.cropContainer}>
                            <Cropper
                                image={userAvatar}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className={classes.controls}>
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
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit">
                            Upload
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>    
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    uploadAvatarStart: userInfo => dispatch(uploadAvatarStart(userInfo))
});

export default connect(null, mapDispatchToProps)(UploadAvatar);