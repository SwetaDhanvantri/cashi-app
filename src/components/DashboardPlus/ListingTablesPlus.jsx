import React, { useState } from 'react'
import DashboardCommanPlus from './DashboardCommanPlus';
// import Status from './StatusChipPlus';
import {CurrencyRupee, Diversity3, LocalOffer, Style, Widgets } from '@mui/icons-material';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useGridApiRef,} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReusableDialog from '../CommanComponents/ReusableDialog';

function CustomToolbar({ onAddCampaign }) {
  return (
    <Box>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />} 
        onClick={onAddCampaign}
      >
        Campaign
      </Button>
    </Box>
  );
}

function maskMobile(number) {
  if (!number) return "";
  const str = number.toString();
  // Show country code + first 5 digits, mask the rest
  return str.slice(0, 3) + "**********";
}

export function GeneratedQRDt() {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleAddCampaign = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const columns = [
        
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'lotno', headerName: 'Lot No.',  flex: isMobile ? undefined : 1,},
         { field: 'noqr', headerName: 'No. of QR', flex: isMobile ? undefined : 1},
        { field: 'expdate', headerName: 'Expiry date',flex: isMobile ? undefined : 1 },
       ]
      
      const rows = [
          { id: 1, lotno:'3456', noqr:'100' ,expdate:'12-07-2028',},
          { id: 2, lotno:'3455', noqr:'123' ,expdate:'12-07-2028',},
       
      ];
     

  return(<>
     <DashboardCommanPlus title="Generated QR" icon={<Style sx={{ mr: 1 }} />} columns={columns} rows={rows}  
      showCheckbox={true} /> 
          <ReusableDialog open={open} onClose={handleClose} />
          </>) 

}


export function LoadedORDt() {
   const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleAddCampaign = () => setOpen(true);
    const handleClose = () => setOpen(false);


 const columns = [
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'lotno', headerName: 'Lot No.',  flex: isMobile ? undefined : 1,},
        { field: 'loadedno', headerName: 'Loaded No.',  flex: isMobile ? undefined : 1,},
        { field: 'noqr', headerName: 'No. of QR', flex: isMobile ? undefined : 1},
        { field: 'date', headerName: 'Date', flex: isMobile ? undefined : 1},
        { field: 'expdate', headerName: 'Expiry date',flex: isMobile ? undefined : 1 },
];

const rows = [
  { id: 1, lotno:'2345', loadedno:'3456', noqr:'100',  date:'12-07-2025',  expdate:'12-07-2028',},
  { id: 2, lotno:'2342', loadedno:'4521', noqr:'120',  date:'12-07-2025',  expdate:'12-07-2028',},
  

];
   return (<>
   <DashboardCommanPlus title="Loaded QR" icon={<LocalOffer sx={{ mr: 1 }} />} columns={columns} rows={rows}  
     showCheckbox={true} />
    <ReusableDialog open={open} onClose={handleClose} />
    </>) ;
}


export function ActivatedQrDt() {
   const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleAddCampaign = () => setOpen(true);
    const handleClose = () => setOpen(false);


 const columns = [
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'lotno', headerName: 'Lot No.',  flex: isMobile ? undefined : 1,},
        { field: 'loadedno', headerName: 'Loaded No.',  flex: isMobile ? undefined : 1,},
        { field: 'noqr', headerName: 'No. of QR', flex: isMobile ? undefined : 1},
        { field: 'date', headerName: 'Date', flex: isMobile ? undefined : 1},
        { field: 'expdate', headerName: 'Expiry date',flex: isMobile ? undefined : 1 },
];

const rows = [
  { id: 1, lotno:'2345', loadedno:'3456', noqr:'100',  date:'12-07-2025',  expdate:'12-07-2028',},
  { id: 2, lotno:'2342', loadedno:'4521', noqr:'120',  date:'12-07-2025',  expdate:'12-07-2028',},
  

];
   return (<>
   <DashboardCommanPlus title="Activated QR" icon={<LocalOffer sx={{ mr: 1 }} />} columns={columns} rows={rows}  
     showCheckbox={true} />
    <ReusableDialog open={open} onClose={handleClose} />
    </>) ;
}


export function TotalCustomerPlusDt() {
  const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);

  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);
       const columns = [
         
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'cname', headerName: 'Customer Name',  flex: isMobile ? undefined : 1,},
        { field: 'contact', headerName: 'Customer Contact', flex: isMobile ? undefined : 1,
         },
        { field: 'date', headerName: 'Date',flex: isMobile ? undefined : 1 },
       ]
      
      const rows = [
        { id: 1,cname:'Aalok Shrivastav',contact:' 7087654326', code: 'COUPON53', date:'12-07-2025',},
        { id: 2,cname:'Mona bhatt',contact:' 9087654326', code: 'COUPON23',date:'10-07-2025' },
        { id: 3,cname:'Monika bhatt',contact:'9087654328', code: 'COUPON24',date:'10-07-2025' },
      ];
     
   return (
    <>
      <DashboardCommanPlus
        title="Total Customer"
        icon={<Diversity3 sx={{ mr: 1 }} />}
        columns={columns}
        rows={rows}
        
        // toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />}
        showCheckbox={true}
      />

    <ReusableDialog open={open} onClose={handleClose} />
    </>
  );
}
