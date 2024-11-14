import { useState, useEffect } from 'react';
import { GetCart, RemoveFromCart } from '../../services/cartServices';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookie from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const ShowCart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await GetCart();  
        if (response && response.data) {
          setCart(response.data);
          calculateTotalPrice(response.data.products); 
        } else {
          console.error('Données de panier non valides :', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    };

    fetchCart();
  }, []);

  const adjustQuantity = async (productId, cartProductId, change) => {
    const updatedCartProducts = cart.products.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
      }
      return item;
    });
  
    setCart({ ...cart, products: updatedCartProducts });
    calculateTotalPrice(updatedCartProducts);
  
    try {
      const response = await axios.patch(
        `${API_URL}/cart_products/${cartProductId}`, 
        { quantity: updatedCartProducts.find(item => item.product.id === productId).quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookie.get("token")
          },
        }
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du panier :', error);
    }
  };
  
  const calculateTotalPrice = (cartProducts) => {
    let total = 0;
    cartProducts.forEach(item => {
      const itemPrice = isNaN(item.product.price) ? 0 : parseFloat(item.product.price);
      const itemQuantity = item.quantity || 1;
      total += itemPrice * itemQuantity;
    });
    setTotalPrice(total.toFixed(2));
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await RemoveFromCart(productId);
      const updatedCart = await GetCart();
      setCart(updatedCart.data);
      calculateTotalPrice(updatedCart.data.products);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier :', error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(`${API_URL}/checkout/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookie.get('token'), 
        },
        body: JSON.stringify({
          total: totalPrice,
          cart_id: cart.cart_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.sessionUrl; 
      } else {
        console.error('Échec de la création de la commande :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
    }
  };

  return (
    <Box sx={{ minHeight: '70vh', display :'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', m: 3 }}>Mon panier</Typography>
      {cart && cart.products && cart.products.length > 0 ? (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',  alignItems: 'center'}}>
          <TableContainer component={Paper} sx={{ minWidth: isMobile ? null : 750 }}>
            <Table aria-label="panier">
              <TableHead>
                <TableRow>
                  <TableCell  align="center">Nom</TableCell>
                  <TableCell align="center">Prix</TableCell>
                  <TableCell align="center">Quantité</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((product) => (
                  <TableRow key={product.product.id}>
                    <TableCell align="center">{product.product.name}</TableCell>
                    <TableCell align="center">{product.product.price} €</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, -1)} aria-label="remove">
                        <RemoveIcon />
                      </IconButton>
                      {product.quantity}
                      <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, 1)} aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRemoveFromCart(product.product.id)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h5" sx={{ textAlign: 'center', margin: 2 }}>Total : {totalPrice} €</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePayment} 
            sx={{ display: 'flex',  justifyContent: 'space-around', maxWidth: '60%', margin: 2, color: 'white', textShadow: '0.5px 0.5px 1px black' }}
          >
            Procéder au paiement
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>Votre panier est vide.</Typography>
      )}
    </Box>
  );
};

export default ShowCart;
