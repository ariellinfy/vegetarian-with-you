import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reviewHelpfulStart, setReviewToBeUpdate } from '../../redux/review/review-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import ReportForm from '../../components/report-form/report-form-component';
import { Avatar, Button, Box, Typography, GridList, GridListTile } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
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

const ReviewPreview = ({ userId, review, reviewHelpfulStart, setReviewToBeUpdate, currentUser, history }) => {

    const currentUserToken = localStorage.getItem('token');

    const { reviewId, review_title, review_body, overall_rate, visit_period, recommended_dishes, 
        user_helpful, helpful_count, user_report, report_count, review_owner, create_at } = review;

    const handleUpdateReview = () => {
        setReviewToBeUpdate(review);
        history.push('/updatereview');
    }

    const [reviewHelpful, setReviewHelpful] = useState({
        userHelpful: user_helpful,
        helpfulCount: helpful_count
    })
    const { userHelpful, helpfulCount } = reviewHelpful;

    const handleClickHelpful = () => {
        if(Object.keys(currentUser).length !== 0) {
            setReviewHelpful({ 
                userHelpful: !user_helpful, 
                helpfulCount: userHelpful ? helpfulCount++ : userHelpful--
            });
            reviewHelpfulStart({ reviewId, userHelpful, helpfulCount, currentUserToken });
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

    return (
        <div className='review-preview'>
            <div className='card-header'>
                <div className='header-avatar'>
                    <Avatar className='avatar'>A</Avatar>
                </div>
                <div className='header-user'>username</div>
            </div>
            
            <div className='card-body'>
                <div className='card-content'>
                    <Box className='content-header' component="div" mb={3} borderColor="transparent">
                        <Rating
                            name="overallRate"
                            value={overall_rate || 0}
                            precision={0.5}
                            readOnly
                        />
                        <Typography variant="h6">Reviewed {create_at}</Typography>
                    </Box>

                    {
                        userId === review_owner ? (
                            <Button variant="contained" color="primary" className='update-btn' onClick={handleUpdateReview}>
                                Update Review
                            </Button>
                        ) : null
                    }

                    <Typography variant="h5">{review_title}</Typography>
                    <Typography variant="body1">{review_body}</Typography>

                    <GridList className='image-container' cols={2.5}>
                        {
                            images.map((image, index) => (
                              <GridListTile key={image.original}>
                                <img className='review-image' src={image.original} alt={`${reviewId}/${index}`} />
                             </GridListTile>
                            ))
                        }
                    </GridList>

                    <Typography variant="body2">Date of Visit: {visit_period}</Typography>
                    <Typography variant="body2">Recommended Dish(es): {recommended_dishes}</Typography>

                    {
                        helpfulCount ? (<Typography variant="body2">{helpfulCount} people found this helpful</Typography>) : null
                    }
                </div>

                <div className='card-actions'>

                    {
                        userHelpful ? (
                            <Typography variant="body2">Thank you for your feedback.</Typography>
                        ) : (
                            <Button variant="contained" color="primary" className='helpful-btn' onClick={handleClickHelpful} startIcon={<ThumbUpIcon />}>
                                Helpful
                            </Button>
                        )
                    }
                    
                    <Button color="secondary" className='report-btn' onClick={handleClickOpen} startIcon={<ReportIcon />}>
                        Report
                    </Button>
                    <ReportForm reviewId={reviewId} user_report={user_report} report_count={report_count} open={open} handleClose={handleClose} />
                </div>

            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    reviewHelpfulStart: data => dispatch(reviewHelpfulStart(data)),
    setReviewToBeUpdate: review => dispatch(setReviewToBeUpdate(review))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewPreview));