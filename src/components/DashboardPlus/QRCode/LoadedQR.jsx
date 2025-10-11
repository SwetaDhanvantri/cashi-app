
import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridSelector, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Container, Typography, Pagination, PaginationItem, useMediaQuery, TextField, DialogActions, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InfoOutline, QrCode2, Verified } from '@mui/icons-material';
import DialogBox from '../../CommanComponents/DialogBox'
import { ToastContainer, toast } from 'react-toastify';
import { Chip } from "@mui/material";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";



const PAGE_SIZE = 5;

export default function LoadedQR() {
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');
 
  const [lotno, setLotno] = useState('');
  const [amount, setAmount] = useState('');
  const [activedate, setActivedate] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile]);

 
  const validate = () => {
    const newErrors = {};
    if (!activedate ) {
      newErrors.activedate= 'Enter Activate Date';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleOk = () => {
    if (!validate()) return;  
     toast.success('QR Code activate successfully!');
     setActivedate('');
     setOpen(false);
  }


 useEffect(() => {                          // Clear form when dialog is closed
  if (!open) {
    setActivedate('');
    setErrors({});
  }
}, [open]);

  return (
    <>
   
      {/* Title */}
       

         <Button variant="contained" sx={{ background:'linear-gradient(195deg, #66BB6A, #43A047)', color: '#ffffff',ml:1}}
          onClick={() => setOpen(true)} > Activate </Button>
    
       <DialogBox open={open} onClose={() => setOpen(false)} title="Activate QR Code">
        
           <DialogContent>
              <TextField className="transparent-textfield" fullWidth margin="normal"
                        label="Lot No." required  value="1235" InputProps={{ readOnly: true }}
                        type="number" inputProps={{ min: 1 }}/>
              <TextField className="transparent-textfield" fullWidth margin="normal"
                        label="Loading No." required  value="7235" InputProps={{ readOnly: true }}
                        type="number" inputProps={{ min: 1 }}/>
              <TextField sx={{mt:2}} fullWidth type="date"  label="Activate Date" InputLabelProps={{ shrink: true }}
                value={activedate}  error={!!errors.activedate}  helperText={errors.activedate} 
              />
           </DialogContent>
         
             <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary"> Cancel </Button>
              <Button onClick={() => {handleOk()}} color="primary" variant="contained"> Ok </Button>
             </DialogActions>
       </DialogBox>
        <ToastContainer />
    </>
  );
}
