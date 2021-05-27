import React from 'react';
import { withRouter } from 'react-router-dom';
import { GridList, GridListTile, Typography, Button } from '@material-ui/core';
import './restaurant-images-style.scss';

const RestaurantImageGallery = ({ restaurantId, photos, history }) => {
    photos = (photos || []).map(photo => photo);

    const openImageGallery = photo => {
      history.push({
        pathname: `/restaurants/${restaurantId}/images`,
        selectedImage: photo
      });
    };

    return (
        <div className='restaurant-category restaurant-images'>
          <GridList className='image-list' cols={3.5} cellHeight='auto'>
            {
              (photos.length || [].length) ? (photos || []).map((photo, index) => (
                <GridListTile key={photo.asset_id}>
                  <img src={photo.secure_url} alt={`${restaurantId}/${index}`} onClick={openImageGallery.bind(this, photo)} />
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
      </div>
    )
};

export default withRouter(RestaurantImageGallery);