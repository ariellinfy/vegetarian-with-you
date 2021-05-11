import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserReviews, selectReviewRequestPending, selectRequestReviewErr } from '../../redux/review/review-selectors';
import { requestUserReviewsStart } from '../../redux/review/review-actions';

import AlertMessage from '../../components/alert-message/alert-message-component';
import Downloader from '../../components/downloading/downloading-componet';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const headCells = [
    { id: 'review_title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'restaurant_name', numeric: true, disablePadding: false, label: 'Restaurant' },
    { id: 'overall_rate', numeric: true, disablePadding: false, label: 'Rating' },
    { id: 'create_at', numeric: true, disablePadding: false, label: 'Review Date' },
    { id: 'last_modified', numeric: true, disablePadding: false, label: 'Last Update' },
];

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
}));

const EnhancedTableHead = ({ classes, order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
        <TableHead>
            <TableRow>
            {
                headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {
                                orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null
                            }
                        </TableSortLabel>
                    </TableCell>
                ))
            }
            </TableRow>
        </TableHead>
    )
};

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const UserReviews = ({ userReviewsCollection, requestPending, requestError, requestUserReviewsStart }) => {
    const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('lastUpdate');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, reviewId) => {
        const selectedIndex = selected.indexOf(reviewId);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, reviewId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (reviewId) => selected.indexOf(reviewId) !== -1;
 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        requestUserReviewsStart({ currentUserToken });
    }, [requestUserReviewsStart, currentUserToken]);

    return (
        <>
            {
                requestPending ? <Downloader /> : (
                    !requestError.length ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <EnhancedTableHead
                                        classes={classes}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        rowCount={userReviewsCollection.length}
                                    />
                                    <TableBody>
                                    {
                                        stableSort(userReviewsCollection, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(review => {
                                            const isItemSelected = isSelected(review.review_id);
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={review.review_id}
                                                    onClick={(event) => handleClick(event, review.review_id)}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell component="th" id={review.review_id} scope="row">
                                                        {review.review_title}
                                                    </TableCell>
                                                    <TableCell align="right">{review.restaurant_name}</TableCell>
                                                    <TableCell align="right">{(review.overall_rate || 0).toFixed(2)}</TableCell>
                                                    <TableCell align="right">{(review.create_at || '').split('T')[0]}</TableCell>
                                                    <TableCell align="right">{(review.last_modified || '').split('T')[0]}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25]}
                                component="div"
                                count={userReviewsCollection.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </>
                    ) : <AlertMessage severity='error' errMsg={requestError} />
                )
            }
        </>
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