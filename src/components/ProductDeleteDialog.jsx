// ProductDeleteDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ProductDeleteDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        Êtes-vous sûr de vouloir supprimer ce produit ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button color="error" onClick={onConfirm}>Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDeleteDialog;
