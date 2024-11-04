import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoHome from './LogoHome';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogOutButton from './LogOutButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
function NavBar() {
  const { token, isAdmin } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const renderDrawer = () => (
    <Drawer
    anchor="top"
    open={isDrawerOpen}
    onClose={toggleDrawer(false)}
    sx={{
      '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: 2,
      },
    }}
  >
    <Grid container>
      {/* Colonne liens et boutons */}
      <Grid item xs={6}>
        <List>
          <ListItem component={Link} to="/products" onClick={toggleDrawer(false)}>
            <ListItemText primary="Tous nos produits" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem component={Link} to="/legumes" onClick={toggleDrawer(false)}>
            <ListItemText primary="Légumes" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem component={Link} to="/fruits" onClick={toggleDrawer(false)}>
            <ListItemText primary="Fruits" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem component={Link} to="/paniers" onClick={toggleDrawer(false)}>
            <ListItemText primary="Panier Garnis" sx={{ color: 'white' }} />
          </ListItem>
          {token ? (
            <>
              {isAdmin ? (
                <>
                  <ListItem component={Link} to="/cart" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Panier" sx={{ color: 'white' }} />
                  </ListItem>
                  <ListItem component={Link} to="/admin/page" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Page Gestion" sx={{ color: 'white' }} />
                  </ListItem>
                  <ListItem component={Link} to="/profil" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Profil" sx={{ color: 'white' }} />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem component={Link} to="/profil" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Profil" sx={{ color: 'white' }} />
                  </ListItem>
                  <ListItem component={Link} to="/cart" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Panier" sx={{ color: 'white' }} />
                  </ListItem>
                </>
              )}
              <ListItem>
                <LogOutButton />
              </ListItem>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <ListItem component={Link} to="/login" onClick={toggleDrawer(false)}>
                <Button size='small' sx={{ color: 'white', border: '2px double white' }} variant="outlined">Connexion</Button>
              </ListItem>
              <ListItem component={Link} to="/signup" onClick={toggleDrawer(false)}>
                <Button size='small' sx={{ color: 'white', border: '2px double white' }} variant="outlined">Inscription</Button>
              </ListItem>
            </Box>
          )}
        </List>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
        <LogoHome />
      </Grid>

      {/* Colonne logo */}
    </Grid>
  </Drawer>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>  
              <Link to="/" style={{ color: 'white', textDecoration: 'none', visited: { color: 'white' } }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Saveurs-Saisonnières
            </Typography>
              </Link>
            <IconButton
            
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{marginLeft: 'auto'}}
            >
              <MenuIcon />
            </IconButton>
            {renderDrawer()}
            
          </>
        ) : (
          <>

            <Box style={{ marginRight: 'auto', marginLeft: 'auto'}}>
              <LogoHome />
            </Box>
            <Box style={{ marginRight: 'auto', marginLeft: 'auto' }}>
              <Button component={Link} size='large' to="/products" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Produits</Button>
              <Button component={Link} size='large' to="/legumes" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Légumes</Button>
              <Button component={Link} size='large' to="/fruits" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Fruits</Button>
              <Button component={Link} size='large' to="/paniers" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Paniers</Button>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', marginLeft: 'auto' }}>
              {token ? (
                <>
                  <Link to="/cart">
                    <ShoppingCartIcon sx={{ color: 'white', height: 35, width: 50, }} />
                  </Link>
                  {isAdmin ? (
                    <Link to="/admin/page">
                      <AccountCircleIcon sx={{ color: 'white', height: 35, width: 50,  }} />
                    </Link>
                  ) : (
                    <Link to="/profil">
                      <AccountCircleIcon sx={{ color: 'white', height: 35, width: 50, }} />
                    </Link>
                  )}
                  <LogOutButton />
                </>
              ):(
                <>
                  <Button variant='outlined' component={Link} to="/login" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Connexion</Button>
                  <Button variant='outlined' component={Link} to="/register" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Inscription</Button>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
