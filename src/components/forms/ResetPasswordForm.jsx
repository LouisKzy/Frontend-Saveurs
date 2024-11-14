import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useRef } from 'react';
import { ResetPasswordFetch } from '../../services/authService';
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from '../../components/SnackbarAlertProvider';
export default function ResetPasswordForm() {
  const emailRef = useRef('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const openSnackbar = useSnackbar();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const response = await ResetPasswordFetch(email);
      
      openSnackbar('Instructions envoyées par email', 'success');
    } catch (error) {
      openSnackbar(error.message, 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: isMobile ? 5: 10, minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Réinitialisation de mot de passe
      </Typography>
      <FormControl fullWidth sx={{ margin: 'auto'}}>
        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center'}}>Votre adresse e-mail </Typography>
        <TextField
          type="email"
          placeholder="Email"
          inputRef={emailRef}
          variant="outlined"
          fullWidth
          sx={{ margin: 'auto', minWidth:isMobile ? "auto" : 600 }}
        />
      </FormControl>

      <Button variant="contained" size={isMobile ? "small" : "medium"} type="submit" sx={{ color: 'white', margin: 'auto' }}>
        Envoyez-moi les instructions
      </Button>
    </Box>
  );
}