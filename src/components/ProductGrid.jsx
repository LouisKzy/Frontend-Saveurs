import { useState, useEffect, useRef } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  Pagination,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import {
  AddShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { AddProductToCart } from "../services/cartServices";
import axios from "axios";
import { API_URL } from "../constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBar from "./SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Navigation } from "swiper/modules";

const ProductGrid = ({ categoryName, productsPerPage = 9 }) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const fetchFilteredProducts = async (searchTerm = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/products`, {
        params: { name: searchTerm },
      });
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits : ", error);
      setError("Une erreur est survenue lors du chargement des produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts("");
  }, []);

  useEffect(() => {
    fetchFilteredProducts(searchTerm);
  }, [searchTerm]);

  const handleOpen = (index) => {
    const globalIndex = (page - 1) * productsPerPage + index;
    const maxIndex = filteredProducts.length - 1;
    const safeIndex = Math.min(globalIndex, maxIndex);
    setSelectedIndex(safeIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    AddProductToCart(productId, quantity);
  };

  const handleQuantityChange = (productId, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: parsedValue,
      }));
    }
  };

  return (
    <Container sx={{ marginTop: 5, marginBottom: 5, minHeight: "60vh" }}>
      <SearchBar
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {error && (
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography variant="h6" align="center">
          Chargement des produits...
        </Typography>
      ) : (
        <>
          <Grid container spacing={5} justifyContent="center">
            {filteredProducts
              .slice((page - 1) * productsPerPage, page * productsPerPage)
              .map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      borderRadius: "25px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={`${API_URL}${product.img_url}`}
                      title={product.name}
                      sx={{ objectFit: "cover", borderRadius: "25px 25px 0 0" }}
                      loading="lazy"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Variété: {product.variety}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Origine : {product.origin}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Prix : {product.price} €
                      </Typography>
                      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          Quantité:
                        </Typography>
                        <TextField
                          type="number"
                          variant="outlined"
                          size="small"
                          inputProps={{ min: 1 }}
                          value={quantities[product.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                          sx={{ width: "80px" }}
                        />
                      </Box>
                    </CardContent>

                    <Grid
                      container
                      spacing={2}
                      sx={{ p: 2 }}
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpen(index)}
                          size="small"
                        >
                          Détails
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleAddToCart(product.id)}
                          startIcon={<AddShoppingCart />}
                        >
                          Ajouter au panier
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Conteneur principal avec display flex */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: isMobile ? "90%" : "60%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            borderRadius: "25px",
            boxShadow: 24,
            overflow: "hidden",

          }}
        >
          {/* Boutons de navigation conditionnels */}
          {!isMobile && filteredProducts.length > 1 && (
            <>
              <IconButton
                ref={prevRef}
                sx={{
                  position: "absolute",
                  left: 0,
                  zIndex: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                ref={nextRef}
                sx={{
                  position: "absolute",
                  right: 0,
                  zIndex: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Swiper ajusté */}
          <Swiper
            spaceBetween={10}
            modules={[Parallax, Navigation]}
            slidesPerView={1}
            loop={filteredProducts.length > 1}
            initialSlide={selectedIndex}
            onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
            parallax={!isMobile && filteredProducts.length > 1}
            navigation={
              !isMobile && filteredProducts.length > 1
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            onBeforeInit={(swiper) => {
              if (!isMobile && filteredProducts.length > 1) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Card sx={{ borderRadius: "25px", m: 0, p: 0 }}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    image={`${API_URL}${product.img_url}`}
                    sx={{
                      objectFit: "cover",
                      height: isMobile ? "180px" : "200px",
                      borderRadius: "25px 25px 0 0",
                      position: "relative",
                    }}
                    loading="lazy"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      p: 2,
                      position: "relative",
                      minHeight: "271px"
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h4"
                      textAlign="center"
                      {...(!isMobile && { "data-swiper-parallax": "-30%" })}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      {...(!isMobile && { "data-swiper-parallax": "-20%" })}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="text.secondary"
                      {...(!isMobile && { "data-swiper-parallax": "-10%" })}
                    >
                      {product.origin}, {product.variety}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mt: 2 }}
                      {...(!isMobile && { "data-swiper-parallax": "-5%" })}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        Quantité:
                      </Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        inputProps={{ min: 1 }}
                        value={quantities[product.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        sx={{ width: "80px" }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        {...(!isMobile && { "data-swiper-parallax": "-15%" })}
                      >
                        Prix : {product.price} €
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product.id)}
                        sx={{ maxWidth: "60%" }}
                        {...(!isMobile && { "data-swiper-parallax": "-10%" })}
                      >
                        Ajouter au panier
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductGrid;
