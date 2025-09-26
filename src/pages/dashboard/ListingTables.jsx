import React, { useState } from 'react'
import DashboardCommanDt from './DashboardCommanDt';
import Status from './StatusChip';
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

export function IssuedCouponDt() {
    const apiRef = useGridApiRef();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleAddCampaign = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const columns = [
        
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        //  { field: 'code', headerName: 'Coupon Code', flex: isMobile ? undefined : 1,
        //     renderCell: (params) => (
        //              <span style={{color:'#37ad52', fontWeight:600}}>
        //                {params.value}
        //              </span>
        //              ),
        //  },
        { field: 'cname', headerName: 'Customer Name',  flex: isMobile ? undefined : 1,},
        { field: 'contact', headerName: 'Contact', flex: isMobile ? undefined : 1 ,
           renderCell: (params) => (
            <Typography>{maskMobile(params.value)}</Typography>
           )
        },
        
        // { field: 'redeem', headerName: 'Redeemed Points',flex: isMobile ? undefined : 1 },
        { field: 'date', headerName: 'Issued Date',flex: isMobile ? undefined : 1 },
        { field: 'expdate', headerName: 'Validity',flex: isMobile ? undefined : 1 },
       ]
      
      const rows = [
          { id: 1,cname:'Aalok Shrivastav',contact:'7087654326', code: 'COUPON53', date:'12-07-2025',expdate:'12-07-2025',},
        { id: 2,cname:'Mona bhatt',contact:'9087654326', code: 'COUPON23',date:'10-07-2025',expdate:'12-07-2025',},
        { id: 3,cname:'Monika bhatt',contact:'9087654328', code: 'COUPON24',date:'10-07-2025', expdate:'12-07-2025',},
      ];
     

  return(<>
     <DashboardCommanDt title="Issued Coupons" icon={<Style sx={{ mr: 1 }} />} columns={columns} rows={rows}  apiRef={apiRef}
      toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />} showCheckbox={true} /> ;
          <ReusableDialog open={open} onClose={handleClose} />
          </>) 

}


export function RedeemedCouponDt() {
    const apiRef = useGridApiRef();
   const isMobile = useMediaQuery('(max-width:768px)');
   const [open, setOpen] = useState(false);



 const columns = [
  { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
  { field: 'cname', headerName: 'Customer Name',  flex: isMobile ? undefined : 1,},
  { field: 'contact', headerName: 'Contact', flex: isMobile ? undefined : 1,
    
   },
  
  // { field: 'redeem', headerName: 'Redeemed Points',flex: isMobile ? undefined : 1 },
  { field: 'date', headerName: 'Date',flex: isMobile ? undefined : 1 },
  // { field: 'amount', headerName: 'Amount', flex: isMobile ? undefined : 1 },
  //  { field: 'location', headerName: '', flex: isMobile ? undefined : 1,
  //     renderHeader: () => (
  //      <span style={{ display: 'flex', alignItems: 'center' }}>
  //        <PinDrop fontSize="small" style={{ marginRight: 4 }} />
  //      </span>
  //    ),
  //   },
];

const rows = [
  { id: 1,cname:'Aalok Shrivastav',contact:' 7087654326', code: 'COUPON53', date:'12-07-2025',},
  { id: 2,cname:'Mona bhatt',contact:'9087654326', code: 'COUPON23',date:'10-07-2025' },

];
   return (<>
   <DashboardCommanDt title="Redeemed Coupons" icon={<LocalOffer sx={{ mr: 1 }} />} columns={columns} rows={rows}  apiRef={apiRef}
    />
  
    </>) ;
}


export function TotalValueDt() {
    const apiRef = useGridApiRef();
   const isMobile = useMediaQuery('(max-width:768px)');
     const columns = [
  { field: 'id', headerName: 'Sr No',flex: isMobile ? undefined : 0.5 },
  { field: 'amount', headerName: 'Amount',  flex: isMobile ? undefined : 1 },
];

const rows = [
  { id: 1, code: 'Demo', amount: 50 },
  { id: 2, code: 'Demo2', amount: 20 },
];
    return <DashboardCommanDt title="Total Value" icon={<Widgets sx={{ mr: 1 }} />} columns={columns} rows={rows}  apiRef={apiRef}  /> ;
}


export function TotalCustomerDt() {
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);

  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);
       const columns = [
         
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'cname', headerName: 'Customer Name',  flex: isMobile ? undefined : 1,},
        { field: 'contact', headerName: 'Customer Contact', flex: isMobile ? undefined : 1,
         },
       
        // { field: 'redeem', headerName: 'Redeemed Points',flex: isMobile ? undefined : 1 },
        { field: 'date', headerName: 'Date',flex: isMobile ? undefined : 1 },
       ]
      
      const rows = [
        { id: 1,cname:'Aalok Shrivastav',contact:' 7087654326', code: 'COUPON53', date:'12-07-2025',},
        { id: 2,cname:'Mona bhatt',contact:' 9087654326', code: 'COUPON23',date:'10-07-2025' },
        { id: 3,cname:'Monika bhatt',contact:'9087654328', code: 'COUPON24',date:'10-07-2025' },
      ];
     
   return (
    <>
      <DashboardCommanDt
        title="Total Customer"
        icon={<Diversity3 sx={{ mr: 1 }} />}
        columns={columns}
        rows={rows}
        apiRef={apiRef}
        toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />}
        showCheckbox={true}
      />

    <ReusableDialog open={open} onClose={handleClose} />
    </>
  );
}
