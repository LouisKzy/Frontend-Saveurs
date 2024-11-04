// OrderList.js
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

function OrderList({
  orders,
  currentOrdersPage,
  ordersPerPage,
  setCurrentOrdersPage,
  isMobile,
  handleOrderClick,
}) {
  const indexOfLastOrder = currentOrdersPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <>
      {/* Tableau des commandes */}
      <TableContainer component={Paper}>
        <Table aria-label="tableau commandes">
          <TableHead>
            <TableRow
              sx={{ "& .MuiTableCell-root": { backgroundColor: "#7B1FA2" } }}
            >
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "12px" : null , color: "white" }}
              >
                N° commande
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "12px" : null, color: "white" }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "12px" : null, color: "white" }}
              >
                Coût
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: isMobile ? "12px" : null, color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
                }}
              >
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "12px" : null }}
                >
                  {order.id}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "12px" : null }}
                >
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "12px" : null }}
                >
                  {order.total_price} €
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: isMobile ? "12px" : null }}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => handleOrderClick(order)}
                  >
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination des commandes */}
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
          page={currentOrdersPage}
          onChange={(event, value) => {
            setCurrentOrdersPage(value);
          }}
          color="secondary"
        />
      </Box>
    </>
  );
}

export default OrderList;
