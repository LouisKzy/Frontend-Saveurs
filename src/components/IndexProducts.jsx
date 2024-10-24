import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { AddProductToCart } from "../services/cartServices";
import { GetProducts } from "../services/productService";
import { API_URL } from "../constants";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const productsPerPage = 9;
  const productsPerLine = 3;
  
  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const renderPaginationItem = (item) => (
    <PaginationItem
    component={Link}
    to={`/products?page=${item.page}`}
    {...item}
    />
    );
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await GetProducts();
          setProducts(response.data);
          console.log("Products:", response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      
      fetchProducts();
    }, []);
    
    return (
      <div
      style={{
        margin: "0 300px",
        padding: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      >
      <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "20px",
      }}
      >
      {products
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map((product) => (
          <Card
          key={product.id}
          style={{
            marginBottom: "50px",
            maxWidth: "300px",
            minWidth: "200px",
            marginLeft: "auto",
            marginRight: "20px",
            width: `${200 / productsPerLine}%`,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
          >
          <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={`${API_URL}${product.img_url}`}
          title={product.name}
          />
          <CardContent style={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
          {product.name}
          </Typography>
          <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          >
          Variété: {product.variety}
          </Typography>
          <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          >
          Origine : {product.origin}
          </Typography>
          <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          >
          Description: {product.description}
          </Typography>
          <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          >
          Prix : {product.price} €
          </Typography>
          </CardContent>
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
          >
          <Button
          onClick={() => handleOpen(product)}
          variant="contained"
          style={{
            backgroundColor: "#DEDEDE",
            color: "black",
            "&:hover": {
              backgroundColor: "#BFBFBF",
            },
          }}
          size="small"
          >
          Détails
          </Button>
          
          <Button
          onClick={() => AddProductToCart(product.id)}
          variant="contained"
          color="primary"
          size="small"
          style={{
            borderRadius: "5px",
            marginLeft: "auto",
          }}
          >
          <AddShoppingCart style={{ color: "white" }} />
          </Button>
          </div>
          </Card>
          ))}
          </div>
          <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          renderItem={renderPaginationItem}
          />
          
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: { backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' },
          }}
          >
          <Fade in={open}>
          <div>
          {selectedProduct && (
            <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              maxWidth: '500px',
            }}
            >
            <CardContent>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6} md={4}>
            <CardMedia
            component="img"
            height="100%"
            image={`${API_URL}${selectedProduct.img_url}`}
            alt={selectedProduct.name}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
            <CardContent>
            <Typography variant="h3" gutterBottom>
            {selectedProduct.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
            Price: {selectedProduct.price} €
            </Typography>
            <Typography variant="body1" gutterBottom>
            Description: {selectedProduct.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
            Origin: {selectedProduct.origin}
            </Typography>
            <Typography variant="body1" gutterBottom>
            Variety: {selectedProduct.variety}
            </Typography>
            <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            onClick={() => AddProductToCart(selectedProduct.id)}
            >
            Add to Cart
            </Button>
            </CardContent>
            </Grid>
            </Grid>
            </CardContent>
            </Card>
            )}
            </div>
            </Fade>
            </Modal>
            </div>
            );
          };
          
          export default ProductList;