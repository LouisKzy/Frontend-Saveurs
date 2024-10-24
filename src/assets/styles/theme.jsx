import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#afb42b',
      '&:hover': {
        color: 'white',
        backgroundColor: '#828A0E',
      },
    },
    secondary: {
      main: '#7b1fa2',
      '&:hover': {
        color: 'white',
        backgroundColor: '#5C107C',
      }
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
