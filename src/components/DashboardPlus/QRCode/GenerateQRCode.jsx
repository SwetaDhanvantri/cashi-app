import { Box, Container, Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Template1, Template2, Template3, Template4 } from './QRTemplates';
import { useNavigate } from 'react-router-dom';

export default function GenerateQRCode({ open, onClose, onGenerate }) {
  const navigate = useNavigate();
  const [totalQR, setTotalQR] = useState('');
  const [lotNo, setLotNo] = useState('');
  const [expDate, setExpDate] = useState('');
  const [template, setTemplate] = useState('1');
  const [errors, setErrors] = useState({});
  const inputRef1 = useRef();
  const templatePreviews = {
  '1': <Box><Template1/></Box>,
  '2': <Box><Template2 /></Box>,
  '3': <Box><Template3 /></Box>,
  '4': <Box><Template4 /></Box>,
};
  const validate = () => {
    const newErrors = {};
    if (!totalQR || isNaN(totalQR) || Number(totalQR) <= 0) {
      newErrors.totalQR = 'Enter a valid number of QR codes';
    }
    if (!lotNo || isNaN(lotNo) || Number(lotNo) <= 0) {
      newErrors.lotNo = 'Enter a valid Lot No.';
    }
    if (!expDate) {
    newErrors.expDate = 'Expiry date is required';
  } else {
    const minDate = new Date(getMinExpiryDate());
    const selectedDate = new Date(expDate);
    if (selectedDate < minDate) {
      newErrors.expDate = 'Expiry date must be at least 3 years from today';
    }
  }
      if (!template) {
      newErrors.template = 'Please select a template';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;
 
    if (onGenerate) {
      onGenerate({ totalQR, expDate , lotNo, template });
    }
   toast.success('QR  Coupon generated successfully!');
    setTotalQR('');
    setLotNo('');
    setExpDate('');
    setTemplate('1');
    setErrors({});
    navigate('loadQR');
    // onClose();
  };
   
  const getMinExpiryDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() + 3);
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
 };

  useEffect(() => {                          // Clear form when dialog is closed
  if (!open) {
    setTotalQR('');
    setExpDate('');
    setTemplate('1');
    setErrors({});
  }else {
    setExpDate(getMinExpiryDate()); // Set default expiry date to +3 years
  }
}, [open]);
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <DialogTitle>
          Generate QR Coupon
        
        </DialogTitle>
        <DialogContent>
          <Box p={3}>
            <Container>
               <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid size={{ xs: 12,sm:12, md: 4,}} >
                   <TextField className="transparent-textfield" fullWidth margin="normal"
                     label="No. of QR Code" required  value={totalQR}  
                     onChange={(e) =>  {
                       setTotalQR(e.target.value);
                       setErrors(prev => ({ ...prev, totalQR: undefined }));
                     }}
                     error={!!errors.totalQR} helperText={errors.totalQR} type="number" inputProps={{ min: 1 }}/>
                  </Grid>
                  <Grid size={{ xs: 12,sm:12, md: 4,}} >
                      <TextField type="date" label="Expiry Date"  InputLabelProps={{ shrink: true }} fullWidth
                        margin="normal" value={expDate} 
                        onChange={(e) => {
                         setExpDate(e.target.value);
                         setErrors(prev => ({ ...prev, expDate: undefined }));
                       }}
                        error={!!errors.expDate} helperText={errors.expDate} inputRef={inputRef1}
                         inputProps={{ min: getMinExpiryDate() }}
                        onClick={() => {
                          if (inputRef1.current && inputRef1.current.showPicker) {
                            inputRef1.current.showPicker();
                          }
                        }}
                      />
                  </Grid>
                  <Grid size={{ xs: 12,sm:12, md: 4,}} >
                      <TextField className="transparent-textfield" fullWidth margin="normal"
                     label="Lot No." required value={lotNo}  
                     onChange={(e) =>  {
                       setLotNo(e.target.value);
                       setErrors(prev => ({ ...prev, lotNo: undefined }));
                     }}
                     error={!!errors.lotNo} helperText={errors.lotNo} type="number" inputProps={{ min: 1 }}  />
                  </Grid>
                  <Grid size={{ xs: 12,sm:12, md: 12,}} >
                 <TextField select label="Choose Template" fullWidth margin="normal" value={template}
                      onChange={(e) => {
                       setTemplate(e.target.value);
                       setErrors(prev => ({ ...prev, template: undefined }));
                     }} 
                      error={!!errors.template} 
                       helperText={errors.template} required >
                      <MenuItem value="1">Template 1</MenuItem>
                      <MenuItem value="2">Template 2</MenuItem>
                      <MenuItem value="3">Template 3</MenuItem>
                      <MenuItem value="4">Template 4</MenuItem>
                    </TextField>
                    {template && (
                      <Box mt={2}> {templatePreviews[template]} </Box>
                    )}
                  </Grid>
               </Grid>
             
             
             
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button  onClick={onClose}>
                  Close
                </Button>
                <Button  variant="contained" color="primary" onClick={handleGenerate} sx={{mx:1}} >
                  Generate
                </Button>
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
       <ToastContainer />
      <style>
        {`
         
         .MuiInputLabel-root {
            color: #888 !important;
         }
        `}
      </style>
    </>
  );
}
