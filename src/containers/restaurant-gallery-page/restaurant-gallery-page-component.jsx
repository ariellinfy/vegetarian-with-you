import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTargetRestaurantInfo } from '../../redux/restaurant/restaurant-selectors';
import './restaurant-gallery-page-style.scss';

const RestaurantGalleryPage = ({ location: { selectedImage }, targetRestaurant }) => {
    const { photos } = targetRestaurant;
    const cloudnaryGalleryRef = useRef(null);
    const imageAssets = photos.map(photo => photo.public_id);
    const targetImageIndex = selectedImage ? photos.findIndex(photo => photo.public_id === selectedImage.public_id) : 0;

    useEffect(() => {
        cloudnaryGalleryRef.current = window.cloudinary.galleryWidget({
            container: "#restaurant-image-gallery",
            cloudName: "alinfy",
            mediaAssets: imageAssets,
            displayProps: {
                mode: "classic",
                columns: 1,
                spacing: 15
            },
            aspectRatio: "4:3",
            transformation: {
                crop: "fill"
            },
            imageBreakpoint: 200,
            bgColor: "transparent",
            carouselLocation: "bottom",
            carouselOffset: 10,
            navigation: "mouseover",
            thumbnailProps: {
                mediaSymbolSize: 42,
                spacing: 20,
                width: 120,
                height: 90,
                navigationFloat: true,
                navigationShape: "rectangle",
                navigationSize: 40,
                navigationColor: "#ffffff",
                selectedStyle: "border",
                selectedBorderPosition: "bottom",
                selectedBorderWidth: 4
            },
            navigationButtonProps: {
                shape: "rectangle",
                iconColor: "#ffffff",
                color: "#000",
                size: 52,
                navigationPosition: "offset",
                navigationOffset: 12
            },
            themeProps: {
                primary: "#000000",
                active: "#ef6c00"
            },
            secureDistribution: "res-s.cloudinary.com",
            secure: true,
            transition: "fade",
            zoomProps: {
                type: "popup",
                trigger: "click"
            },
            startIndex: targetImageIndex
        });
        cloudnaryGalleryRef.current.render();
    }, [imageAssets, targetImageIndex]);

    return (
        <div id="restaurant-image-gallery"></div>
    )
};

const mapStateToProps = createStructuredSelector({
    targetRestaurant: selectTargetRestaurantInfo,
});

export default connect(mapStateToProps)(RestaurantGalleryPage);