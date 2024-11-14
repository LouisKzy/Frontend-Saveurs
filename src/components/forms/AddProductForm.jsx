import { useState } from "react";
import { AddProductfetch } from "../../services/productService";
import Cookies from "js-cookie";
import { Container, Box, Typography, Grid, TextField, Button, MenuItem, useMediaQuery } from '@mui/material';
import { useSnackbar } from "../SnackbarAlertProvider";
import useTheme from "@mui/material/styles/useTheme";
const AddProductForm = () => {
  const openSnackbar = useSnackbar();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    category: "",
    image: null,
    isAdmin: Cookies.get("useradmin"),
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setProductData({
      ...productData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AddProductfetch(productData);
      openSnackbar("Produit ajouté avec succès", "success");
    } catch (error) {
      openSnackbar(error.message, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3} pb={5}>
        <Typography variant="h4" textAlign="center" gutterBottom>Créer un nouveau produit</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nom" type="text" name="name" value={productData.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Prix" type="number" name="price" value={productData.price} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={4} name="description" value={productData.description} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Origine" type="text" name="origin" value={productData.origin} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Variété" type="text" name="variety" value={productData.variety} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Categorie"
                value={productData.category}
                onChange={(event) => setProductData(prevState => ({ ...prevState, category: event.target.value }))}
              >
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Légumes">Légumes</MenuItem>
                <MenuItem value="Paniers">Paniers</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
              <Button
                variant="contained"
                component="label"
                sx={{ color: 'white', width: '140px'}}
                size="small"
              >
                Ajouter une image
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {productData.image && <Typography variant="body2" color="textSecondary">{productData.image.name}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button size={isMobile ? "small" : "medium"} type="submit" sx={{ color: 'white', width: '140px' }} variant="contained">Créer le produit</Button>
                <Button size={isMobile ? "small" : "medium"} variant="contained" sx={{ minWidth: '140px' }} color="warning" onClick={() => window.location.href = "/admin/page"}>Retour</Button> 
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddProductForm;
