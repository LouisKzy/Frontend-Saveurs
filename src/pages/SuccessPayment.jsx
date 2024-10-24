import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../constants';
import { Typography, Box } from '@mui/material';
  const SuccessPayment = () => {
    const [, setMessage] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = window.location.href;
          const hashIndex = url.indexOf('#');
          const hashParams = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
          const sessionId = new URLSearchParams(hashParams).get('session_id');
          if (!sessionId) {
            console.error('Session ID not found in URL hash');
            return;
          }
          const response = await axios.get(`${API_URL}/checkout/success?session_id=${sessionId}`, {
            headers: {
              Authorization: Cookies.get('token'),
            },
          });
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error fetching success message:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <Box sx={{ padding: 40, textAlign: 'center'}}>
      <Typography variant="h4" gutterBottom>
        Paiment Validé
      </Typography>
      <Typography variant="h5" gutterBottom>
        Rendez-vous dans 1h au magasin, 14 rue des étoiles 34 000 Montpellier 
      </Typography>
      <Typography variant="h5" gutterBottom>
      À très vite ! 
      </Typography>
    </Box>
  );
};

export default SuccessPayment;