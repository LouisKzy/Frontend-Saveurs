import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProductfetch, EditProductfetch } from "../services/productService";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

const EditProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GetProductfetch(productId);
        setProductData(response);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchProduct(); // Appel de la fonction fetchProduct ici
  }, [productId]); // productId est ajouté au tableau de dépendances
  console.log(productData);
  const isAdmin = Cookies.get("useradmin") === "true";

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
      await EditProductfetch(productId, productData, isAdmin);
      console.log("Produit mis à jour avec succès.");
      navigate("/admin/page");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
      console.log(productData);
      console.log(productId);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          align="center"
          gutterBottom
          value={productData.name}
        >
          Modifier le produit
        </Typography>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Nom</InputLabel>
          <Input
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Prix</InputLabel>
          <Input
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            type="number"
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Description</InputLabel>
          <Input
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            multiline
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Origine</InputLabel>
          <Input
            name="origin"
            value={productData.origin}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Variété</InputLabel>
          <Input
            name="variety"
            value={productData.variety}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <Input type="file" id="image-upload" onChange={handleFileChange} />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enregistrer les modifications
        </Button>
      </form>
    </Box>
  );
};

export default EditProductForm;
