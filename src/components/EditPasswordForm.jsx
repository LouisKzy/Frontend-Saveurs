import { useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EditPasswordFetch } from '../services/authService';
import { useRef } from 'react';

export default function EditPasswordForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get('reset_password_token');

  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const data = await EditPasswordFetch(password, confirmPassword, resetPasswordToken);
      console.log(data)
      window.location.href = '/login';
    } catch (error) {
      alert('Failed to edit password: ' + error.message);
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>Changez votre mot de passe</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            type="password"
            placeholder="Nouveau mot de passe"
            inputRef={passwordRef}
          />
          <TextField
            type="password"
            placeholder="Confirmez le nouveau mot de passe"
            inputRef={confirmPasswordRef}
          />
        </FormControl>

        <Button variant="contained" type="submit">
          Enregistrer les changements
        </Button>
      </Box>
    </>
  )
}
