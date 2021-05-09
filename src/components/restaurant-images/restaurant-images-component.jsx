import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { GridList, GridListTile, Dialog, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import './restaurant-images-style.scss';

const RestaurantImageGallery = ({ restaurantId, photos, history }) => {
    photos = (photos || []).map(photo => {
        return {
          ...photo,
          original: `http://localhost:5000/${photo.path}`,
          thumbnail: `http://localhost:5000/${photo.path}`
        }
    });

    const [open, setOpen] = useState(false);
    const [selectImage, setCurrentImage] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = event => {
        setCurrentImage(parseInt(event.target.alt.split('/')[1]));
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='restaurant-category restaurant-images'>
            <GridList className='image-list' cols={3.5} cellHeight='auto'>
              {
                (photos.length || [].length) ? (photos || []).map((photo, index) => (
                  <GridListTile key={photo.filename}>
                    <img src={photo.original} alt={`${restaurantId}/${index}`} onClick={handleClickOpen} />
                  </GridListTile>
                )) : (
                  <div className='no-review'>
                      <Typography variant="subtitle1">Enhance this page - Write reviews!</Typography>
                      <Button variant="contained" color="primary" className='review-btn'
                        onClick={() => history.push('/createreview')}>
                        Add a Review
                      </Button>
                  </div>
                )
              }
            </GridList>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <ImageGallery 
                  items={photos}
                  startIndex={selectImage} />
            </Dialog>
        </div>
    )
};

export default withRouter(RestaurantImageGallery);