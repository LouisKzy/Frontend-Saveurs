import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetProducts,
  DeleteProductfetch,
  GetOrders,
} from "../services/adminServices";
import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "../components/SnackbarAlertProvider";

// Import des sous-composants
import ProductActions from '../components/ProductActions';
import ProductList from '../components/ProductList';
import ProductDeleteDialog from '../components/ProductDeleteDialog';
import OrderList from '../components/OrderList';
import OrderDetailsDialog from '../components/OrderDetailsDialog';

function AdminPage() {
  const [state, setState] = useState({
    products: [],
    selectedProductId: null,
    isConfirmationOpen: false,
    orders: [],
    selectedOrder: null,
    isOrderDetailsOpen: false,
    currentProductsPage: 1,
    productsPerPage: 10,
    currentOrdersPage: 1,
    ordersPerPage: 10,
  });
  const openSnackbar = useSnackbar();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProducts = async () => {
    try {
      const products = await GetProducts();
      setState((prevState) => ({
        ...prevState,
        products,
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits :",
        error.message
      );
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await GetOrders(isAdmin);
      setState((prevState) => ({
        ...prevState,
        orders,
      }));
    } catch (error) {
      openSnackbar(
        "Erreur lors de la récupération des commandes",
        "error"
      );
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await DeleteProductfetch(state.selectedProductId, isAdmin);

      if (response.status === 204) {
        openSnackbar("Produit supprimé avec succès.", "success");
      } else if (response.status === 200) {
        const data = response.data;
        openSnackbar(data.message || "Le statut du produit a été mis à jour.", "success");
      } else {
        openSnackbar("Une erreur inattendue est survenue.", "error");
      }

    } catch (error) {

      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          openSnackbar(data.error || "Une erreur est survenue.", "error");
        } else {
          openSnackbar(data.error || "Une erreur inattendue est survenue.", "error");
        }
      } else {
        console.error("Erreur lors de la suppression du produit :", error.message);
        openSnackbar("Erreur lors de la suppression du produit.", "error");
      }
    } finally {
      fetchProducts();
      setState((prevState) => ({
        ...prevState,
        isConfirmationOpen: false,
      }));
    }
  };

  const handleCancelDelete = () => {
    setState((prevState) => ({
      ...prevState,
      selectedProductId: null,
      isConfirmationOpen: false,
    }));
  };

  const navigateToAddProduct = () => {
    navigate("/admin/products/add");
  };

  const navigateToEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleOrderClick = (order) => {
    setState((prevState) => ({
      ...prevState,
      selectedOrder: order,
      isOrderDetailsOpen: true,
    }));
  };

  const handleCloseOrderDetails = () => {
    setState((prevState) => ({
      ...prevState,
      isOrderDetailsOpen: false,
      selectedOrder: null,
    }));
  };

  const handleClick = (id) => {
    setState((prevState) => ({
      ...prevState,
      selectedProductId: id,
      isConfirmationOpen: true,
    }));
  };

  const setCurrentProductsPage = (value) => {
    setState((prevState) => ({
      ...prevState,
      currentProductsPage: value,
    }));
  };

  const setCurrentOrdersPage = (value) => {
    setState((prevState) => ({
      ...prevState,
      currentOrdersPage: value,
    }));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [isAdmin]);

  return (
    <>
      {/* Liste des produits */}
      <Box
        sx={{
          paddingBottom: 2,
          paddingLeft: 2,
          paddingRight: 2,
          marginTop: 5,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
            Liste des produits
          </Typography>
          <ProductActions
            fetchProducts={fetchProducts}
            navigateToAddProduct={navigateToAddProduct}
            isMobile={isMobile}
          />
        </Box>

        <ProductList
          products={state.products}
          currentProductsPage={state.currentProductsPage}
          productsPerPage={state.productsPerPage}
          setCurrentProductsPage={setCurrentProductsPage}
          isMobile={isMobile}
          handleClick={handleClick}
          navigateToEditProduct={navigateToEditProduct}
        />

        <ProductDeleteDialog
          isOpen={state.isConfirmationOpen}
          onClose={handleCancelDelete}
          onConfirm={handleDeleteConfirmed}
        />
      </Box>

      {/* Liste des commandes */}
      <Box
        sx={{
          paddingBottom: isMobile ? 2 : 1,
          paddingLeft: 2,
          paddingRight: 2,
          marginTop: 5,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
          Commandes
        </Typography>

        <OrderList
          orders={state.orders}
          currentOrdersPage={state.currentOrdersPage}
          ordersPerPage={state.ordersPerPage}
          setCurrentOrdersPage={setCurrentOrdersPage}
          isMobile={isMobile}
          handleOrderClick={handleOrderClick}
        />

        <OrderDetailsDialog
          isOpen={state.isOrderDetailsOpen}
          onClose={handleCloseOrderDetails}
          order={state.selectedOrder}
        />
      </Box>
    </>
  );
}

export default AdminPage;
