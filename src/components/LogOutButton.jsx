import { useTheme } from "@mui/material/styles";
import { LogoutFetch } from "../services/authService";
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice";
import {Button, useMediaQuery} from '@mui/material/';
export default function LogOutButton() {
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = async () => {
    try {
      await LogoutFetch();
      dispatch(logout());
      window.location.href = "/";

    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };
  
    
  
  return (
    <Button variant="outlined" onClick={handleClick} sx={{
      marginRight: isMobile ? 0 : 5,
      bgcolor: 'white',
      color: 'purple',
      "&&:hover": {  color: "purple",bgcolor: '#FFFFFF', },
    }}>
      Se déconnecter
    </Button>
  );
}