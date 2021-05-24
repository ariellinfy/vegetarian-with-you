import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reviewHelpfulStart, setReviewToBeUpdate } from '../../redux/review/review-actions';
import { Image, Transformation } from 'cloudinary-react';
import DeleteReview from '../delete-review/delete-review-component';
import ReportForm from '../report-form/report-form-component';
import { Avatar, Button, Box, Typography, GridList, GridListTile, Menu, MenuItem, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { green } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReportIcon from '@material-ui/icons/Report';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import './review-preview-style.scss';

const ReviewPreview = ({ currentUser, review, query, reviewHelpfulStart, setReviewToBeUpdate, history }) => {

    let currentUserToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')).token : '';

    const { review_id, restaurant_id, review_title, review_body, overall_rate, visit_period, recommended_dishes, photos,
        user_helpful, helpful_count, review_owner, create_at, public_name, avatar, contributions, helpful_votes } = review;

    const createDate = (create_at || '').split('T')[0];

    // handle helpful votes

    const onHelpful = user_helpful === null || user_helpful === undefined ? false : user_helpful;

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
            reviewHelpfulStart({ restaurant_id, review_id, userHelpful, currentUserToken });
        } else {
            history.push('/signin');
        }
    };

    // handle review report

    const [openReport, setOpenReport] = useState(false);

    const handleReportClick = () => {
        if(Object.keys(currentUser).length !== 0) {
            setOpenReport(true);
        } else {
            history.push('/signin');
        }
    };

    const handleReportClose = () => {
        setOpenReport(false);
    };

    // handle update review

    const [anchorEl, setAnchorEl] = useState(null);

    const handleReviewClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleReviewClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateReview = () => {
        setReviewToBeUpdate(review);
        history.push('/updatereview');
        setAnchorEl(null);
    };
    
    // handle delete review

    const [openDeleteReview, setOpenDeleteReview] = useState(false);

    const handleClickOpenDeleteReview = () => {
        setAnchorEl(null);
        setOpenDeleteReview(true);
    };

    const handleCloseDeleteReview = () => {
        setOpenDeleteReview(false);
    };

    return (
        <div className='review-preview'>
            <div className='card-header'>
                <div className='header-avatar'>
                    {
                        avatar ? (
                            <Image cloud_name='alinfy' publicId={avatar.path} secure="true" className='img-avatar'>
                            {
                                avatar.coordinates ? 
                                    <Transformation quality="60" crop="crop"
                                        x={avatar.coordinates.custom[0][0]} y={avatar.coordinates.custom[0][1]} 
                                        width={avatar.coordinates.custom[0][2]} height={avatar.coordinates.custom[0][3]} />
                                    : <Transformation quality="60" aspectRatio="1:1" crop="fill" />
                            }
                            <Transformation radius="max" />
                            <Transformation width="120" crop="scale" />
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                        ) : <Avatar className='font-avatar'>{public_name[0]}</Avatar>
                    }
                </div>
                <Typography className='header-user' variant="subtitle1">{public_name}</Typography>
                <div className='header-user-data-container'>
                    {
                        contributions ? (
                            <div className='user-data'>
                                <RateReviewOutlinedIcon fontSize="small" />
                                <Typography className='header-user' variant="subtitle2">{contributions}</Typography>
                            </div>
                        ) : null
                    }
                    {
                        helpful_votes ? (
                            <div className='user-data'>
                                <ThumbUpOutlinedIcon fontSize="small" />
                                <Typography className='header-user' variant="subtitle2">{helpful_votes}</Typography>
                            </div>
                        ) : null
                    }
                </div>
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
                            <div className='review-btn'>
                                <IconButton onClick={handleReviewClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="review-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleReviewClose}
                                >
                                    <MenuItem onClick={handleUpdateReview}>Update Review</MenuItem>
                                    <MenuItem onClick={handleClickOpenDeleteReview}>Delete Review</MenuItem>
                                    <DeleteReview restaurantId={restaurant_id} reviewId={review_id} query={query} open={openDeleteReview} handleClose={handleCloseDeleteReview}/>
                                </Menu>
                            </div>
                        ) : null
                    }
                </Box>

                <div className='content-body'>
                    <Typography className='review-title' variant="h6">{review_title}</Typography>
                    <Typography className='review-body' variant="body1">{review_body}</Typography>

                    <div className='image-container'>
                        <GridList className='image-list' cols={5}>
                            {
                                photos.map((photo, index) => (
                                <GridListTile key={photo.filename}>
                                    <img className='review-image' src={`https://vegetarian-with-you-api.herokuapp.com/${photo.path}`} alt={`${review_id}/${index}`} />
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
                        helpfulCount ? (<Typography className='review-helpful' variant="body2">{helpfulCount} people found this helpful</Typography>) : null
                    }
                </div>

                <div className='card-actions'>

                    {
                        userHelpful ? (
                            <div className='feedback'>
                                <CheckCircleIcon className='feedback-icon' fontSize="small" style={{ color: green[700] }} />
                                <Typography className='feedback-body' variant="body2">Thank you for your feedback.</Typography>
                            </div>
                        ) : (
                            <Button variant='outlined' color="primary" className='helpful-btn' onClick={handleClickHelpful} startIcon={<ThumbUpIcon />}>
                                Helpful
                            </Button>
                        )
                    }
                    
                    <div>
                        <Button color="secondary" className='report-btn' onClick={handleReportClick} startIcon={<ReportIcon />}>
                            Report
                        </Button>
                        <ReportForm restaurantId={restaurant_id} reviewId={review_id} open={openReport} handleClose={handleReportClose} />
                    </div>

                </div>

            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    reviewHelpfulStart: data => dispatch(reviewHelpfulStart(data)),
    setReviewToBeUpdate: review => dispatch(setReviewToBeUpdate(review)),
});

export default withRouter(connect(null, mapDispatchToProps)(ReviewPreview));