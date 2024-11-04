import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C0CA33",
    },
    secondary: {
      main: "#7B1FA2",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      color: "white",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      color: "#000000",
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
    body1: {
      fontSize: "1rem",
      color: "#000000",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "white", 
        },
      },
    },
  },
});

export default theme;
