import React, { useState } from 'react';

import { GridList, GridListTile, Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import './restaurant-images-style.scss';

const list = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const RestaurantImageGallery = () => {

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className='restaurant-category restaurant-images'>

            <GridList className='image-list' cols={2.5} cellHeight='auto'>
              {list.map((tile) => (
                <GridListTile key={tile.original}>
                  <img src={tile.original} alt={tile.original} onClick={handleClickOpen} />
                </GridListTile>
              ))}
            </GridList>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <ImageGallery items={list} />
            </Dialog>

        </div>
    )
};

export default RestaurantImageGallery;