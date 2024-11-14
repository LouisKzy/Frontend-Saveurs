import { Drawer, List, ListItem, ListItemText, Typography, Box, Button, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { addItemToCart, removeItemFromCart, fetchCart } from "../features/cartSlice";
import { useEffect } from "react";

function CartPreview({ open, toggleDrawer }) {
  const cart = useSelector((state) => state.cart.products || []);
  const dispatch = useDispatch();

  // Chargement initial du panier lors de l'ouverture
  useEffect(() => {
    if (open) {
      dispatch(fetchCart());
    }
  }, [open, dispatch]);

  // Gestion de l'ajout d'un produit
  const handleAdd = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
  };

  // Gestion de la diminution de la quantité
  const handleRemove = (productId) => {
    dispatch(addItemToCart({ productId, quantity: -1 }));
  };

  // Gestion de la suppression du produit
  const handleDelete = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          padding: 2,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Votre Panier
      </Typography>

      {/* Vérification si le panier est vide */}
      {Array.isArray(cart) && cart.length === 0 ? (
        <Typography variant="body1">Le panier est vide.</Typography>
      ) : (
        <List>
          {/* Affichage des produits du panier */}
          {Array.isArray(cart) && cart.map((item) => (
            <>
            <ListItem key={item.product.id} sx={{ display: "flex", alignItems: "center" }}>
              <ListItemText
                primary={item.product.name}
                secondary={`Quantité : ${item.quantity}`}
                
                primaryTypographyProps={{ style: { color: "black" } }}
                secondaryTypographyProps={{ style: { color: "gray" } }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => handleAdd(item.product.id)} color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton disabled={item.quantity === 1} onClick={() => handleRemove(item.product.id)} color="secondary">
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.product.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Typography variant="body2" sx={{ color: "gray", marginLeft: 2 }}>
              Prix : {item.product.price}
            </Typography>
            </>

          ))}

          {/* Affichage du prix total du panier */}
          <ListItem sx={{ display: "flex", alignItems: "center" }}>
            <ListItemText
              primary="Total"
              secondary={`Prix total : ${cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0) .toFixed(2)} €`}
              primaryTypographyProps={{ style: { color: "black" } }}
              secondaryTypographyProps={{ style: { color: "gray" } }}
            />
          </ListItem>
        </List>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/cart"
          fullWidth
          onClick={() => toggleDrawer(false)}
          sx={{ color: "white" }}
        >
          Aller au Panier
        </Button>
      </Box>
    </Drawer>
  );
}

export default CartPreview;
