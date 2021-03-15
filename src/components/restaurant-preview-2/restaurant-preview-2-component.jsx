import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import './restaurant-preview-2-style.scss';

const RestaurantPreviewTwo = () => {

    return (
        <div className='restaurant-preview-2-container'>
            <Card className='preview-2-container'>
                <CardActionArea className='restaurant-info'>
                    <CardMedia
                        className='restaurant-image'
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                
                    <CardContent className='restaurant-detail'>
                        <Typography gutterBottom variant="h5" component="h2">
                            {/* {restaurantName} */}
                            Teatro Restaurant
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" gutterBottom className='restaurant-features'>
                            {/* {restaurantCuisine}, {restaurantType}, {restaurantPrice} */}
                            Vegan, Chinese, Mid-range
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p" className='restaurant-location'>
                            {/* {restaurantCuisineCity}, {restaurantCountry} */}
                            Calgary, Canada
                        </Typography>
                        <CardActions className='restaurant-action'>
                            <Button size="small" color="primary">
                                Write a review
                            </Button>
                        </CardActions>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default RestaurantPreviewTwo;