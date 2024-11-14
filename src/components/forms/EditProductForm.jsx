import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProductfetch, EditProductfetch } from "../../services/productService";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useSnackbar } from '../SnackbarAlertProvider';

const EditProductForm = () => {
  const openSnackbar = useSnackbar();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    image: null,
    imageFileName: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GetProductfetch(productId);
        setProductData({
          ...response,
          imageFileName: "", 
          image: null,
        });
      } catch (error) {
        openSnackbar("Erreur lors de la récupération des données du produit : " + error.message, 'error');
      }
    };
    fetchProduct();
  }, [productId, openSnackbar]);

  const isAdmin = Cookies.get("useradmin") === "true";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        image: file,
        imageFileName: file.name,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await EditProductfetch(productId, productData, isAdmin);
      openSnackbar("Produit mis à jour avec succès.", "success");
      navigate("/admin/page");
    } catch (error) {
      openSnackbar("Erreur lors de la mise à jour du produit : " + error.message, "error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: 4 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "400px", marginTop: "auto" }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          align="center"
          gutterBottom
        >
          Modifier le produit
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Nom"
          value={productData.name}
          onChange={handleInputChange}
          variant="outlined"
        />

        <TextField
          fullWidth
          margin="normal"
          id="price"
          name="price"
          label="Prix"
          value={productData.price}
          onChange={handleInputChange}
          type="number"
          variant="outlined"
        />

        <TextField
          fullWidth
          margin="normal"
          id="description"
          name="description"
          label="Description"
          value={productData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          variant="outlined"
        />

        <TextField
          fullWidth
          margin="normal"
          id="origin"
          name="origin"
          label="Origine"
          value={productData.origin}
          onChange={handleInputChange}
          variant="outlined"
        />

        <TextField
          fullWidth
          margin="normal"
          id="variety"
          name="variety"
          label="Variété"
          value={productData.variety}
          onChange={handleInputChange}
          variant="outlined"
        />

        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, color: "white" }}
        >
          Télécharger une image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {productData.imageFileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Fichier sélectionné : {productData.imageFileName}
          </Typography>
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, color: "white" }}
        >
          Enregistrer les modifications
        </Button>
      </Box>
    </Box>
  );
};

export default EditProductForm;
