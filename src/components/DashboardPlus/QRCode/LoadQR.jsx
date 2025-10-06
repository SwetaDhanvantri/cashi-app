
import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridSelector, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Container, Typography, Pagination, PaginationItem, useMediaQuery, TextField, DialogActions, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {PrintOutlined, QrCode2, SystemUpdateAltOutlined ,InfoOutline,Verified, CheckCircleOutline} from '@mui/icons-material';
import DialogBox from '../../CommanComponents/DialogBox'
import { ToastContainer, toast } from 'react-toastify';
import { Chip } from "@mui/material";
import { MenuItem } from '@mui/material';
import  LoadedQR from "./LoadedQR"



function CustomPagination({ apiRef, isMobile }) {
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => {
        apiRef.current.setPage(value - 1);
        // re-autosize on page change for mobile
        if (isMobile && apiRef.current) {
          setTimeout(() => {
            apiRef.current.autosizeColumns({ includeHeaders: true });
          }, 0);
        }
      }}
    />
  );
}

const PAGE_SIZE = 5;

export default function LoadQR() {

  const rows = [
  {
   id:1, qr: '122',expdate:'8899', status:'Activated', amount:'100', lotno:'12345', loadedno:'100'
  },
  {
   id:2, qr: '123',expdate:'8890', status:'Pending', amount:'', lotno:'45533'
  },
  {
   id:3, qr: '123',expdate:'8890', status:'Pending', amount:'', lotno:'87764'
  },
  {
   id:4, qr: '124',expdate:'8892', status:'Loaded', amount:'1233', lotno:'22442', loadedno:'500'
  },
   {
   id:5, qr: '123',expdate:'8840', status:'Pending', amount:'', lotno:'45533'
  },
  {
   id:6, qr: '223', expdate:'2890', status:'Pending', amount:'', lotno:'87764'
  },
   {
   id:7, qr: '423',expdate:'8890', status:'Pending', amount:'', lotno:'45535'
  },
  {
   id:8, qr: '623',expdate:'8890', status:'Pending', amount:'', lotno:'87754'
  },
]
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const [lotno, setLotno] = useState('');
  const [loadedNo, setLoadedNo] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);





  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile]);

 // Validations for Load QR
  const validate = () => {
    const newErrors = {};
    if (!lotno || isNaN(lotno) || Number(lotno) <= 0) {
      newErrors.lotno= 'Please Select Lot no.';
    }
    if (!loadedNo || isNaN(loadedNo) || Number(loadedNo) <= 0) {
      newErrors.loadedNo= 'Enter a valid Loaded No.';
    }
    if (!amount || isNaN(amount) || Number(lotno) <= 0) {
      newErrors.amount= 'Enter a valid Amount';
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOk = () => {
    if (!validate()) return;  
     toast.success('QR Code loaded successfully!');
     setLotno('');
     setAmount('');
     setOpen(false);
  }

 //Filter

  const [filterStatus, setFilterStatus] = useState('Pending');
  const [filterLotNo, setFilterLotNo] = useState('');
  const [filterLoadedNo, setFilterLoadedNo] = useState('');

  const lotNoRows = filterStatus
    ? rows.filter(row => row.status === filterStatus)
    : rows;
  const uniqueLotNos = Array.from(new Set(lotNoRows.map(row => row.lotno).filter(lot => lot)));
  const uniqueLoadedNos = Array.from(new Set(lotNoRows.map(row => row.loadedno).filter(loaded => loaded)));



  // Filter rows based on status , lot no  and Loaded no
   const filteredRows = rows.filter(row => {
    const statusMatch = filterStatus ? row.status === filterStatus : true;
    const lotNoMatch = filterLotNo ? row.lotno === filterLotNo : true;
    const loadedNoMatch = filterLoadedNo ? row.loadedno === filterLoadedNo : true;
    return statusMatch && lotNoMatch && loadedNoMatch;
  });

 
 
 const columns = [
  { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
  { field: 'qr', headerName: 'QR',  flex: isMobile ? undefined : 1,},
  { field: 'expdate', headerName: 'Expiry Date', flex: isMobile ? undefined : 1 },
  { field: 'amount', headerName: 'Amount', flex: isMobile ? undefined : 1 },
  { field: 'status', headerName: 'Status', flex: isMobile ? undefined : 1,
    renderCell: (params) => {
      let color = "default";
      let icon = null;
      let border = "default";

      switch (params.value) {
        case "Activated":
          color = "#098665";
          border= '1px solid #098665';
          icon = <Verified sx={{ fontSize: 18 }} />;
          break;
        case "Pending":
          color = "#e9aa0aff";
            border= '1px solid #e9aa0aff';
         
          icon = <InfoOutline sx={{ fontSize: 18 }} />;
          break;
        case "Loaded":
           color = "#0a32d4ff";
          border= '1px solid #0a32d4ff';
          icon = <CheckCircleOutline sx={{ fontSize: 18 }} />;
          break;
        default:
          color = "default";
      }
        return (
        <Chip
          icon={icon}
          label={params.value || "Unknown"}
          variant="outlined"
          color={color}
          sx={{ borderRadius: "18px", fontWeight: 500, border:{border}, color:{color} }}
        />
      );
    }
   },
  { field: 'lotno', headerName: 'Lot No', flex: isMobile ? undefined : 1 },
  { field: 'loadedno', headerName: 'Loaded No', flex: isMobile ? undefined : 1 },

 ]


 useEffect(() => { 
                     
  if (!open) {
    setLotno('');
    setAmount('')
    setErrors({});
  }
}, [open]);

  return (
    <Container>
        {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
        <Button
          variant="contained" sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() => navigate(-1)} >  Back </Button>
       
      </Box>
      {/* Title */}
      <Typography   variant="h6" gutterBottom
        sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
          p: 1,  color: '#ffffff', borderRadius: '4px', mb: 3, display: 'flex', alignItems: 'center'}}  >
        <SystemUpdateAltOutlined sx={{mx:1, fontSize:'22px'}}/>  
        QR Code List
      </Typography>

       <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
         <Button variant="contained"  sx={{ background:'linear-gradient(195deg, #42424a, #191919)', 
          color: '#ffffff'}} onClick={() => navigate('printQR')} >
          <PrintOutlined sx={{mx:1}}/> Print QR
        </Button>

         <Button variant="contained" sx={{ background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color: '#ffffff',ml:1}}
          onClick={() => setOpen(true)} >
          <SystemUpdateAltOutlined sx={{mx:1, fontSize:'22px'}}/> Load
         </Button>

      
         <LoadedQR />
          
       </Box>
     
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
       <TextField select label="Filter Status" value={filterStatus}
          onChange={e => {
            setFilterStatus(e.target.value);
            setFilterLotNo('');
            setFilterLoadedNo('');
          }}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Activated">Activated</MenuItem>
          <MenuItem value="Loaded">Loaded</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
        <TextField  select label="Lot No." value={filterLotNo}  onChange={e => setFilterLotNo(e.target.value)}
          sx={{ minWidth: 140 }}  disabled={uniqueLotNos.length === 0} >
          <MenuItem value="">All</MenuItem>
          {uniqueLotNos.map(lot => (
            <MenuItem key={lot} value={lot}>{lot}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Loaded No" value={filterLoadedNo} onChange={e => setFilterLoadedNo(e.target.value)}
          sx={{ minWidth: 140 }} disabled={uniqueLoadedNos.length === 0}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueLoadedNos.map(loaded => (
            <MenuItem key={loaded} value={loaded}>{loaded}</MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" color="error" sx={{ height: 56 }}
          onClick={() => {
            setFilterStatus('Pending');
            setFilterLotNo('');
            setFilterLoadedNo('');
          }}
        >
          Clear Filter
        </Button>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 'auto', maxHeight: 500, width: '100%' }}>
        <DataGrid
         apiRef={apiRef}  
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PAGE_SIZE]}
          slots={{
            pagination: () => <CustomPagination apiRef={apiRef} isMobile={isMobile} />,
          }}
          sx={{
             '& .MuiDataGrid-cell': {
               whiteSpace: 'normal',     // Allow wrapping
               lineHeight:'20px',
               wordBreak: 'break-word', 
               display: 'flex',
              alignItems: 'center', // Vertically center content
              gap: '4px'},
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              color: '#000',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: 14,
              fontWeight: '600',
               whiteSpace: 'normal',
              wordBreak: 'break-word'
            },
          }}
          
          showToolbar
           checkboxSelection
           disableRowSelectionOnClick
        />
      </Box>

       <DialogBox open={open} onClose={() => setOpen(false)} title="Load QR Code">
           <TextField className="transparent-textfield" fullWidth margin="normal"
            label="Lot No." required  value="1235" InputProps={{ readOnly: true }}
            type="number" inputProps={{ min: 1 }}/>
    
          <TextField className="transparent-textfield" fullWidth margin="normal"
             label="Loaded No." required  value={loadedNo}  
             onChange={(e) =>  {
               setLoadedNo(e.target.value);
               setErrors(prev => ({ ...prev, loadedNo: undefined }));
             }}
             error={!!errors.loadedNo} helperText={errors.loadedNo} type="number" inputProps={{ min: 1 }}/>

          <TextField className="transparent-textfield" fullWidth margin="normal"
             label="Enter Amount" required  value={amount}  
             onChange={(e) =>  {
               setAmount(e.target.value);
               setErrors(prev => ({ ...prev, amount: undefined }));
             }}
             error={!!errors.amount} helperText={errors.amount} type="number" inputProps={{ min: 1 }}/>
             <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary"> Cancel </Button>
              <Button onClick={() => {handleOk()}} color="primary" variant="contained"> Ok </Button>
             </DialogActions>
       </DialogBox>

     

        <ToastContainer />
        <ToastContainer />
    </Container>
  );
}
