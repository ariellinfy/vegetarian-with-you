import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './user-reviews-style.scss';

const UserReviews = () => {
    const createData = (title, restaurant, rating, reviewDate, lastUpdate) => {
        return { title, restaurant, rating, reviewDate, lastUpdate };
    };

    const rows = [
        createData('Frozen yoghurt', 'abc', 5, '2020-01-31', '2020-01-31'),
        createData('Ice cream sandwich', 'qwerege', 4, '2020-01-31', '2020-01-31'),
        createData('Eclair', 'rgeerb', 3.5, '2020-01-31', '2020-01-31'),
        createData('Cupcake', 'hntr', 2.5, '2020-01-31', '2020-01-31'),
        createData('Gingerbread', 'hgwhruhrueol', 1.5, '2020-01-31', '2020-01-31'),
    ];
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
                    {rows.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.restaurant}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.reviewDate}</TableCell>
                            <TableCell align="right">{row.lastUpdate}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserReviews;