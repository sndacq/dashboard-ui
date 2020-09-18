import React from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';

import { hideAlertNotification, selectAlert } from './coreSlice'; 


function AlertNotification() {
    const dispatch = useDispatch();
    const alertData = useSelector(selectAlert, shallowEqual);

    return (
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',}}
        open={alertData.value}
        autoHideDuration={5000}
        onClose={() => dispatch(hideAlertNotification())}
        message={alertData.message}
        action={
        <React.Fragment>
            <IconButton size="small" color="inherit" onClick={() => dispatch(hideAlertNotification())}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
        }/>

    );
}

export default AlertNotification;