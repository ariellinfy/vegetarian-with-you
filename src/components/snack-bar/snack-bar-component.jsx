import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Snackbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Toast = ({ severity, message }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <div className={classes.root}>
            <Snackbar open={open} anchorOrigin={'bottom', 'left'} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="filled" elevation={6} severity={severity} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
};

export default Toast;