import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reviewHelpfulStart, setReviewToBeUpdate, requestReviewsStart } from '../../redux/review/review-actions';

import ReportForm from '../../components/report-form/report-form-component';
import { Avatar, Button, Box, Typography, GridList, GridListTile } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReportIcon from '@material-ui/icons/Report';
import './review-preview-style.scss';

const images = [
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

const ReviewPreview = ({ currentUser, review, restaurantId, query,
    reviewHelpfulStart, setReviewToBeUpdate, requestReviewsStart, history }) => {

    const currentUserToken = localStorage.getItem('token');

    const { review_id, review_title, review_body, overall_rate, visit_period, recommended_dishes, 
        user_helpful, helpful_count, review_owner, create_at } = review;


    const onHelpful = user_helpful === null || user_helpful === undefined ? false : user_helpful;

    const createDate = (create_at || '').split('T')[0];

    const handleUpdateReview = () => {
        setReviewToBeUpdate(review);
        history.push('/updatereview');
    };

    const [reviewHelpful, setReviewHelpful] = useState({
        userHelpful: onHelpful,
        helpfulCount: helpful_count
    });
    let { userHelpful, helpfulCount } = reviewHelpful;

    const handleClickHelpful = () => {
        if(Object.keys(currentUser).length !== 0) {
            setReviewHelpful({ 
                userHelpful: true, 
                helpfulCount: helpfulCount+1
            });
            reviewHelpfulStart({ restaurantId, review_id, userHelpful, currentUserToken });
        } else {
            history.push('/signin');
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if(Object.keys(currentUser).length !== 0) {
            setOpen(true);
        } else {
            history.push('/signin');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     requestReviewsStart({ query, currentUserToken });
    // }, [userHelpful]);    

    return (
        <div className='review-preview'>
            <div className='card-header'>
                <div className='header-avatar'>
                    <Avatar className='avatar'>A</Avatar>
                </div>
                <div className='header-user'>username</div>
            </div>
            
            <div className='card-body'>
                <Box className='content-header' component="div" mb={3} borderColor="transparent">
                    <div className='header-info'>
                        <Rating
                            name="overallRate"
                            value={overall_rate || 0}
                            precision={0.5}
                            readOnly
                        />
                        <Typography className='review-date' variant="subtitle2">Reviewed {createDate}</Typography>
                    </div>
                    
                    {
                        currentUser.user_id === review_owner ? (
                            <Button color="secondary" className='update-btn' onClick={handleUpdateReview}>
                                Update Review
                            </Button>
                        ) : null
                    }
                </Box>

                <div className='content-body'>
                    <Typography className='review-title' variant="h5">{review_title}</Typography>
                    <Typography className='review-body' variant="body1">{review_body}</Typography>

                    <div className='image-container'>
                        <GridList className='image-list' cols={5}>
                            {
                                images.map((image, index) => (
                                <GridListTile key={image.original}>
                                    <img className='review-image' src={image.original} alt={`${review_id}/${index}`} />
                                </GridListTile>
                                ))
                            }
                        </GridList>
                    </div>

                    <Typography className='review-more' variant="body2">Date of Visit: {visit_period}</Typography>
                    <Typography className='review-more text-cap' variant="body2">
                        {
                            recommended_dishes ? (`Recommended Dishes: ${recommended_dishes}`) : null
                        }
                    </Typography>

                    {
                        helpfulCount ? (<Typography className='review-helpful' variant="subtitle2">{helpfulCount} people found this helpful</Typography>) : null
                    }
                </div>

                <div className='card-actions'>

                    {
                        userHelpful ? (
                            <div className='feedback'>
                                <CheckCircleIcon fontSize="small" style={{ color: green[700] }} />
                                <Typography className='feedback-body' variant="body2">Thank you for your feedback.</Typography>
                            </div>
                        ) : (
                            <Button color="primary" className='helpful-btn' onClick={handleClickHelpful} startIcon={<ThumbUpIcon />}>
                                Helpful
                            </Button>
                        )
                    }
                    
                    <div>
                        <Button color="secondary" className='report-btn' onClick={handleClickOpen} startIcon={<ReportIcon />}>
                            Report
                        </Button>
                        <ReportForm restaurantId={restaurantId} reviewId={review_id} open={open} handleClose={handleClose} />
                    </div>

                </div>

            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    reviewHelpfulStart: data => dispatch(reviewHelpfulStart(data)),
    setReviewToBeUpdate: review => dispatch(setReviewToBeUpdate(review)),
    requestReviewsStart: data => dispatch(requestReviewsStart(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(ReviewPreview));