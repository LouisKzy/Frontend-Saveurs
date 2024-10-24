import { useState, useEffect } from 'react';
import { GetCart, RemoveFromCart } from '../services/cartServices';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookie from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../constants';

const ShowCart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await GetCart();  
        if (response && response.data) {
          setCart(response.data);
          calculateTotalPrice(response.data.products); 
          console.log('Panier :', response.data);
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
      console.log('Panier mis à jour :', response.data);
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
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await RemoveFromCart(productId);
      const updatedCart = await GetCart();
      setCart(updatedCart.data);
      calculateTotalPrice(updatedCart.data.products);
      console.log(updatedCart)
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
    <Grid container spacing={3} sx={{ paddingTop: 20, paddingBottom: 15, paddingLeft: 20, paddingRight: 100 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Mon panier</Typography>
      </Grid>
      <Grid item xs={12}>
        {cart && cart.products && cart.products.length > 0 ? (
          <Paper>
            <List>
              {cart.products.map((product) => (
                <ListItem key={product.id}>
                  <ListItemText 
                    primary={`Nom : ${product.product.name}`} 
                    secondary={`Prix : ${isNaN(product.product.price) ? 'N/A' : product.product.price * ( 1)}`} 
                    sx={{ paddingRight: '20px' }}
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, -1)} aria-label="remove">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ marginX: '8px' }}>{typeof product.quantity === 'number' ? product.quantity : 1}</Typography>
                    <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, 1)} aria-label="add">
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveFromCart(product.product.id)} aria-label="delete" sx={{ marginRight: '8px' }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography variant="body1">Votre panier est vide.</Typography>
        )}
      </Grid>
      {cart && cart.products && cart.products.length > 0 && (
        <Grid item xs={12} sx={{ paddingTop: 5 }}>
          <Typography variant="h5">Total : {totalPrice} €</Typography> 
          <Button variant="contained" color="primary" onClick={handlePayment} sx={{ marginTop: 3 }}>Procéder au paiement</Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ShowCart;
