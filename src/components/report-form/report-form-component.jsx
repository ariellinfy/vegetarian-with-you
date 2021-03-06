import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reportReviewStart } from '../../redux/review/review-actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    actions: {
        padding: '8px 24px 16px 24px',
    }
  }));

const ReportForm = ({ restaurantId, reviewId, open, handleClose, reportReviewStart }) => {

    const classes = useStyles();
    let currentUserToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')).token : '';

    const [reportText, setReportText] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        reportReviewStart({ restaurantId, reviewId, reportText, currentUserToken });
        setReportText('');
    };
    
    const handleChange = event => {
        setReportText(event.target.value);
    };

    return (
        <div className='report-form'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="report-title">Report a Problem</DialogTitle>
                <Divider />
                <form className='report-container' onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl className='selection-group' component="fieldset" required>
                            <FormLabel className={classes.text} component="legend">What's wrong with this review?</FormLabel>
                            <RadioGroup className='radio-group' aria-label="reportText" name="reportText" value={reportText} onChange={handleChange}>
                                <FormControlLabel 
                                    className='select-label' 
                                    value="Unwanted commercial content or spam" 
                                    control={<Radio className='select-input' required />} 
                                    label="Unwanted commercial content or spam" 
                                />
                                <FormControlLabel 
                                    className='select-label' 
                                    value="Inappropriate or not family friendly comments" 
                                    control={<Radio className='select-input' required />} 
                                    label="Inappropriate or not family friendly comments" 
                                />
                                <FormControlLabel  
                                    className='select-label' 
                                    value="The business is closed or doesn't exist" 
                                    control={<Radio className='select-input' required />} 
                                    label="The business is closed or doesn't exist" 
                                />
                                <FormControlLabel 
                                    className='select-label'
                                    value="It's posted to the wrong business" 
                                    control={<Radio className='select-input' required />} 
                                    label="It's posted to the wrong business" 
                                />
                                <FormControlLabel 
                                    className='select-label' 
                                    value="It's duplicate or copied text" 
                                    control={<Radio className='select-input' required />} 
                                    label="It's duplicate or copied text" 
                                />
                                <FormControlLabel 
                                    className='select-label' 
                                    value="Review text is not consistent with rating given" 
                                    control={<Radio className='select-input' required />} 
                                    label="Review text is not consistent with rating given" 
                                />
                                <FormControlLabel  
                                    className='select-label' 
                                    value="It includes private information" 
                                    control={<Radio className='select-input' required />} 
                                    label="It includes private information" 
                                />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="secondary" type="submit" disabled = {reportText.length ? false : true}>
                            Report
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    reportReviewStart: data => dispatch(reportReviewStart(data))
});

export default connect(null, mapDispatchToProps)(ReportForm);