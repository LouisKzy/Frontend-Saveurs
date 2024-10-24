import { Link } from "react-router-dom";
import { LogoutFetch } from "../services/authService";
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice";
import Button from '@mui/material/Button';
export default function LogOutButton() {
  const dispatch = useDispatch();


  const handleClick = async () => {
    try {
      await LogoutFetch();
      dispatch(logout());
      
      console.log("Logged out successfully");
    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };
  
    
  
  return (
    <Button variant="outlined" onClick={handleClick} sx={{
      marginTop: -5,
      marginRight: 20,
      bgcolor: '#FFFFFF',
      color: '#000000',
      '&:hover': {
        bgcolor: '#E5E5E5', 
      },
    }}>
      <Link to="/login">Se déconnecter</Link>
    </Button>
  );
}