import { AppBar, Toolbar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoHome from './LogoHome';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogOutButton from './LogOutButton';

function NavBar() {
  const { token, isAdmin } = useSelector((state) => state.auth);

  return (
    <div style={{ marginTop: 20 }}>
      <AppBar position="static">
        <Toolbar sx={{ alignItems: 'center', mt: 5 }}>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
            <LogoHome />
          </div>
            <div style={{ marginRight: 'auto'}}>
              <Button component={Link} to="/products" color="inherit" sx={{ marginRight: 2,  color: 'white' }}>Produits</Button>
              <Button component={Link} to="/legumes" color="inherit" sx={{ marginRight: 2,  color: 'white' }}>Légumes</Button>
              <Button component={Link} to="/fruits" color="inherit" sx={{  color: 'white'}}>Fruits</Button>
              <Button component={Link} to="/paniers" color="inherit" sx={{ marginRight: 2,  color: 'white' }}>Paniers</Button>
            </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {token && (
              <>
                <Link to="/cart"><ShoppingCartIcon sx={{ color: 'white', marginRight: 5, width: 40, height: 40, marginTop: -5 }} /></Link>
                {isAdmin ? (
                  <Link to="/admin/page">
                    <AccountCircleIcon sx={{ color: 'white', marginRight: 5, width: 50, height: 50, marginTop: -5 }} />
                  </Link>
                ) : (
                  <Link to="/profil">
                    <AccountCircleIcon sx={{ color: 'white', marginRight: 5, width: 50, height: 50, marginTop: -5 }} />
                  </Link>
                )}
                <LogOutButton /> 
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
