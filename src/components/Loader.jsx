// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

function Loader({ isLoading, minLoadingTime = 0 }) {
  const [showLoader, setShowLoader] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timer;

    if (isLoading) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      setShowLoader(true);
    } else if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsedTime;

      if (remainingTime > 0) {
        timer = setTimeout(() => {
          setShowLoader(false);
          setStartTime(null);
        }, remainingTime);
      } else {
        setShowLoader(false);
        setStartTime(null);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, minLoadingTime, startTime]);

  if (!showLoader) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
