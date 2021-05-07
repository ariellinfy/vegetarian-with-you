import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Collapse, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: 'center',
        width: '100%',
        marginTop: '0.75em',
        marginBottom: '0.75em',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AlertMessage = ({ severity, errMsg }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert variant="filled" severity={severity} action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    {errMsg}
                </Alert>
            </Collapse>
        </div>
    )
};

export default AlertMessage;