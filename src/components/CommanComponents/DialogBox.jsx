import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';



export default function DialogBox({ open, onClose, title, children, maxWidth = "sm", fullWidth = true }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle>
        {title}
     
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
   
    </Dialog>
  );
}