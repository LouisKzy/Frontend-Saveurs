import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { AddProductToCart } from "../services/cartServices";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { API_URL } from "../constants";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

const FruitsPage = () => {
  const [fruits, setFruits] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fruitsPerPage = 12;
  const fruitsPerLine = 4;

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?categorie=Fruits`);
        const fruitProducts = response.data.filter(product => product.categorie === "Fruits")
        setFruits(fruitProducts);
        console.log(fruitProducts);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };

    fetchFruits();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderPaginationItem = (item) => (
    <PaginationItem
      component={Link}
      to={`/fruits?page=${item.page}`}
      {...item}
    />
  );

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

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
        {fruits
          .slice((page - 1) * fruitsPerPage, page * fruitsPerPage)
          .map((fruit) => (
            <Card
              key={fruit.id}
              style={{
                marginBottom: "50px",
                maxWidth: "300px",
                minWidth: "200px",
                marginLeft: "auto",
                marginRight: "20px",
                width: `${200 / fruitsPerLine}%`,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={fruit.name}
                height="200"
                image={API_URL + fruit.img_url}
                title={fruit.name}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {fruit.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Variété: {fruit.variety}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Origine : {fruit.origin}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Description: {fruit.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Prix : {fruit.price} €
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
                  onClick={() => handleOpenModal(fruit)}
                  variant="contained"
                  style={{
                    backgroundColor: "#DEDEDE",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#BFBFBF"
                    }
                  }}
                  size="small"
                >
                  Détails
                </Button>
                <Button
                  onClick={() => AddProductToCart(fruit.id)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{
                    borderRadius: "5px",
                    marginLeft: "auto",
                  }}
                >
                  <ShoppingCartIcon style={{ color: "white" }} />
                </Button>
              </div>
            </Card>
          ))}
      </div>
      <Pagination
        count={Math.ceil(fruits.length / fruitsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={renderPaginationItem}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
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
                  <Typography variant="h3" gutterBottom>
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Prix: {selectedProduct.price} €
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Description: {selectedProduct.description}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Origine: {selectedProduct.origin}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Variété: {selectedProduct.variety}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => AddProductToCart(selectedProduct.id)}
                  >
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FruitsPage;
