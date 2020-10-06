import React from 'react';

import { useSelector } from 'react-redux';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectBackdrop } from './coreSlice';

function AppBackdrop() {
  const backdrop = useSelector(selectBackdrop);

  return (
    <Backdrop className="backdrop" open={backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default AppBackdrop;
