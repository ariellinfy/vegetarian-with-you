import React, { useState } from 'react';

import { GridList, GridListTile, Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import ScrollMenu from 'react-horizontal-scrolling-menu';
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

// const ImageItem = ({url, selected}) => (
//     <div className={`menu-item ${selected ? 'active' : ''}`}>
//         <img
//           style={{ height: "200px" }}
//           alt="test"
//           src={url}
//         />
//     </div>
// );

// export const ImageMenu = (list, selected) =>
//     list.map(el => {
//       const { original } = el;
//       return <ImageItem url={original} key={original} selected={selected} />;
// });

const RestaurantImageGallery = () => {
    // const [selected, setSelected] = useState('item1');

    // const menu = ImageMenu(list, selected);

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
            {/* <ScrollMenu
                data={menu}
                arrowLeft={ChevronLeftIcon}
                arrowRight={ChevronRightIcon}
                selected={selected}
                onSelect={key => setSelected({ selected: key })}
                onClick={handleClickOpen}
            /> */}

            <GridList className='image-list' cols={2.5}>
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