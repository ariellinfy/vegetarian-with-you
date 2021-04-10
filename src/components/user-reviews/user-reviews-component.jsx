import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserReviews } from '../../redux/review/review-selectors';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './user-reviews-style.scss';

const UserReviews = ({ userReviews }) => {
    console.log(userReviews);
    const createData = (title, restaurant, rating, reviewDate, lastUpdate) => {
        return { title, restaurant, rating, reviewDate, lastUpdate };
    };

    let reviews = [];

    useEffect(async () => {
        try {
            reviews = await userReviews.map(({ review_title, restaurant_name, overall_rate, create_at, last_modified }) => {
                let overallRate = (overall_rate || 0).toFixed(2);
                let reviewDate = (create_at || '').split('T')[0];
                let lastUpdate = (last_modified || '').split('T')[0];
                return createData(review_title, restaurant_name, overallRate, reviewDate, lastUpdate);
            })
            console.log(reviews);
        } catch (err) {
            console.log(err);
        }
    });

    console.log(reviews);

    return (
        <div className='user-reviews-page'>
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
                        reviews.map((review) => (
                            <TableRow key={review.title}>
                                <TableCell component="th" scope="row">
                                    {review.title}
                                </TableCell>
                                <TableCell align="right">{review.restaurant}</TableCell>
                                <TableCell align="right">{review.rating}</TableCell>
                                <TableCell align="right">{review.reviewDate}</TableCell>
                                <TableCell align="right">{review.lastUpdate}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    userReviews: selectUserReviews,
});

export default connect(mapStateToProps)(UserReviews);