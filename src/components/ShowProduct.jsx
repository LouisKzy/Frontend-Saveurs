import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { AddProductToCart } from "../services/cartServices";
import { API_URL_PRODUCTS, API_URL } from "../constants";
const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL_PRODUCTS}/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div style={{ paddingTop: 100, paddingLeft: 400, paddingRight: 400, paddingBottom: 100 }}>
      <Typography variant="h2" gutterBottom>
        {product.name}
      </Typography>
      {product && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ height: "80%" }}>
              <CardMedia
                component="img"
                height="100%"
                image={`${API_URL}/${product.img_url}`}
                alt={product.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Card style={{ height: "80%" }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Price: {product.price} €
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {product.description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Origin: {product.origin}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Variety: {product.variety}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCart />}
                  onClick={() => AddProductToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ShowProduct;
