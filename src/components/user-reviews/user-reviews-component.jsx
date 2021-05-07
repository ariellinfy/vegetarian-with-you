import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserReviews, selectReviewRequestPending, selectRequestReviewErr } from '../../redux/review/review-selectors';
import { requestUserReviewsStart } from '../../redux/review/review-actions';

import AlertMessage from '../../components/alert-message/alert-message-component';
import Downloader from '../../components/downloading/downloading-componet';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './user-reviews-style.scss';

const UserReviews = ({ userReviewsCollection, requestPending, requestError, requestUserReviewsStart }) => {

    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;

    useEffect(() => {
        requestUserReviewsStart({ currentUserToken });
    }, []);

    return (
        <div className='user-reviews-page'>
            {
                requestPending ? <Downloader /> : (
                    !requestError.length ? (
                        <TableContainer component={Paper}>
                            <Table className='reviews-container'>
                                <TableHead className='reviews-table-head'>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Restaurant</TableCell>
                                        <TableCell align="right">Rating</TableCell>
                                        <TableCell align="right">Review Date</TableCell>
                                        <TableCell align="right">Last Update</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='reviews-table-body'>
                                {
                                    userReviewsCollection.map((review) => (
                                        <TableRow key={review.review_id}>
                                            <TableCell component="th" scope="row">
                                                {review.review_title}
                                            </TableCell>
                                            <TableCell align="right">{review.restaurant_name}</TableCell>
                                            <TableCell align="right">{(review.overall_rate || 0).toFixed(2)}</TableCell>
                                            <TableCell align="right">{(review.create_at || '').split('T')[0]}</TableCell>
                                            <TableCell align="right">{(review.last_modified || '').split('T')[0]}</TableCell>
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : <AlertMessage severity='error' errMsg={requestError} />
                )
            }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    userReviewsCollection: selectUserReviews,
    requestPending: selectReviewRequestPending,
    requestError: selectRequestReviewErr,
});

const mapDispatchToProps = dispatch => ({
    requestUserReviewsStart: currentUserToken => dispatch(requestUserReviewsStart(currentUserToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);