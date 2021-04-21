import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteReviewStart, requestReviewsAuthStart } from '../../redux/review/review-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, FormControlLabel, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    actions: {
        padding: '10px 24px 16px 24px',
    }
  }));

const DeleteReview = ({ restaurantId, reviewId, query, open, handleClose, deleteReviewStart, requestReviewsAuthStart }) => {
    const classes = useStyles();
    const currentUserToken = localStorage.getItem('token');

    const [confirmDelete, setConfirmation] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        await deleteReviewStart({ reviewId, restaurantId, confirmDelete, currentUserToken });
        setConfirmation(false);
        await requestReviewsAuthStart({ query, currentUserToken });
    };
    
    const handleChange = event => {
        setConfirmation(event.target.checked);
    };

    return (
        <div className='delete-review-page'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="delete-review-title">Delete Review Confirmation</DialogTitle>
                <Divider />
                <form className='delete-review-form' onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText className={classes.text}>
                            All the contributions to this review will be removed. Are you sure you want to delete this review? 
                        </DialogContentText>
                        <FormControlLabel
                            control={<Checkbox checked={confirmDelete} onChange={handleChange} name="confirmDelete" required />}
                            label="Yes, please proceed to delete this review."
                        />                       
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit" disabled = {confirmDelete ? false : true}>
                            Confirm
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteReviewStart: data => dispatch(deleteReviewStart(data)),
    requestReviewsAuthStart: data => dispatch(requestReviewsAuthStart(data)),
});

export default connect(null, mapDispatchToProps)(DeleteReview);