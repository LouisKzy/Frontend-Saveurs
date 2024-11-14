// ProductActions.js
import React from 'react';
import { Box, Button } from '@mui/material';

function ProductActions({ fetchProducts, navigateToAddProduct, isMobile }) {
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
    >
      <Button
        variant="contained"
        onClick={fetchProducts}
        sx={{
          marginBottom: 2,
          marginRight: 1,
          color: "white",
          "&:hover": { backgroundColor: "#E5E5E5" },
        }}
      >
        Rafraîchir
      </Button>
      <Button
        variant="contained"
        onClick={navigateToAddProduct}
        sx={{ marginBottom: 2, color: "white" }}
      >
        Ajouter un produit
      </Button>
    </Box>
  );
}

export default ProductActions;
