import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useRef } from 'react';
import { ResetPasswordFetch } from '../services/authService';

export default function ResetPasswordForm() {
  const emailRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const response = await ResetPasswordFetch(email);
      console.log(response);
    } catch (error) {
      console.error('Failed to reset password:', error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 50 }}>
      <Typography variant="h5" gutterBottom>
        Réinitialisation de mot de passe
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Typography variant="body1">Votre adresse e-mail :</Typography>
        <TextField
          type="email"
          placeholder="Email"
          inputRef={emailRef}
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <Button variant="contained" type="submit" fullWidth>
        Envoyez-moi les instructions
      </Button>
    </Box>
  );
}