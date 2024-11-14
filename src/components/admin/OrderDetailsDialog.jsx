// OrderDetailsDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

function OrderDetailsDialog({ isOpen, onClose, order }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      {order && (
        <>
          <DialogContent>
            <DialogTitle textAlign={"center"}>Détails de la commande</DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="h6">
                Numéro de commande : {order.id}
              </Typography>
              <Typography variant="h6">
                Date :{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                <TableRow sx={{ "& .MuiTableCell-root": { backgroundColor: "#7B1FA2" } }}>
                    <TableCell sx={{ color: "white" }} align="center">Nom du produit</TableCell>
                    <TableCell sx={{ color: "white" }} align="center">Quantité</TableCell>
                    <TableCell sx={{ color: "white" }} align="center">Prix unitaire</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item, index) => (
                    <TableRow key={item.id} sx={{ backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5", }}>
                      <TableCell align="center">
                        {item.product.name}
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        {item.product.price} €
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="h5" sx={{ margin: 2 }}>
                Total : {order.total_price} €
              </Typography>
              <DialogActions>
                <Button variant="contained" onClick={onClose} sx={{ margin: 2, color: "white" }}>Fermer</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default OrderDetailsDialog;
