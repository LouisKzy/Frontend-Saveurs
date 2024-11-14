// ProductList.js
import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
  Pagination,
} from '@mui/material';

function ProductList({
  products,
  currentProductsPage,
  productsPerPage,
  setCurrentProductsPage,
  isMobile,
  handleClick,
  navigateToEditProduct,
}) {
  // Calcul des index pour la pagination des produits
  const indexOfLastProduct = currentProductsPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      {/* Tableau des produits */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table
          sx={{ minWidth: isMobile ? 0 : 570 }}
          aria-label="tableau produits"
        >
          <TableHead>
            <TableRow
              sx={{ "& .MuiTableCell-root": { backgroundColor: "#7B1FA2" } }}
            >
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "8px" : null, color: "white" }}
              >
                Nom
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: isMobile ? "none" : "table-cell",
                  color: "white",
                }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "8px" : null, color: "white" }}
              >
                Prix
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: isMobile ? "none" : "table-cell",
                  color: "white",
                }}
              >
                Variété
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: isMobile ? "none" : "table-cell",
                  color: "white",
                }}
              >
                Catégorie
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: isMobile ? "none" : "table-cell",
                  color: "white",
                }}
              >
                Origine
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: isMobile ? "none" : "table-cell",
                  color: "white",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "8px" : null, color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product, index) => (
              <TableRow
                key={product.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
                }}
              >
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "8px" : null }}
                >
                  {product.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ display: isMobile ? "none" : "table-cell" }}
                >
                  {product.description}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "8px" : null }}
                >
                  {product.price} €
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ display: isMobile ? "none" : "table-cell" }}
                >
                  {product.variety}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ display: isMobile ? "none" : "table-cell" }}
                >
                  {product.category}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ display: isMobile ? "none" : "table-cell" }}
                >
                  {product.origin}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: isMobile ? "none" : "table-cell",
                  }}
                >
                  {product.active ? "Actif" : "Inactif"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    padding: isMobile ? "8px" : null,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "space-around" : "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color={product.active ? "error" : "success"}
                    size={isMobile ? "small" : "medium"}
                    onClick={() => handleClick(product.id)}
                    sx={{
                      marginRight: isMobile ? 0 : 2,
                      marginBottom: isMobile ? 0.5 : 0,
                    }}
                  >
                    {product.active ? "Supprimer" : "Activer"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => navigateToEditProduct(product.id)}
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination des produits */}
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentProductsPage}
          onChange={(event, value) => {
            setCurrentProductsPage(value);
          }}
          color="secondary"
        />
      </Box>
    </>
  );
}

export default ProductList;
