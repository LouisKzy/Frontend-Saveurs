import { useState } from "react";
import { AddProductfetch } from "../services/productService";
import Cookies from "js-cookie";
import { Container, Box, Typography, Grid, TextField, Select, MenuItem, Button } from '@mui/material';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    categorie: "",
    image: null,
    isAdmin: Cookies.get("useradmin"),
  });
  const [, setSubmitting] = useState(false);
  const [, setError] = useState(null);
  const [, setSuccess] = useState(false);

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
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Données du produit:", productData);
      await AddProductfetch(productData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
      window.location.href = "/admin/products";
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3} pb={5}>
        <Typography variant="h4" gutterBottom>Créer un nouveau produit</Typography>
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
              <Typography variant="h6" gutterBottom>Catégorie</Typography>
              <Select fullWidth label="Catégorie" value={productData.categorie} onChange={(event) => setProductData(prevState => ({...prevState,categorie: event.target.value}))}>
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Légumes">Légumes</MenuItem>
                <MenuItem value="Paniers">Paniers</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Créer le produit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddProductForm;
