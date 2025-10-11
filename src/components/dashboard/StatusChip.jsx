// components/StatusChip.jsx
import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { Close, InfoOutline, InfoOutlined, Replay, Verified, WarningAmber } from '@mui/icons-material';
import {Box, Button, Typography, Grid, Dialog, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const STATUS_OPTIONS = ['Active', 'Pending', 'Rejected', 'Resubmit'];
const StyledChip = styled(Chip)(({ theme, ownerState }) => ({
  justifyContent: 'left',
  '& .icon': {
    color: 'inherit',
  },
  ...(ownerState.status === 'Approved' && {
    color: '#098665',
    border: '1px solid #098665',
  }),
  ...(ownerState.status === 'Pending' && {
    color: '#0a32d4ff',
    border: '1px solid #0a32d4ff',
  }),
  ...(ownerState.status === 'Rejected' && {
    color: '#cb0c06ff',
    border: '1px solid #cb0c06ff',
  }),
  ...(ownerState.status === 'Resubmit' && {
    color: '#e9aa0aff',
    border: '1px solid #e9aa0aff',
  }),
}));


const Status = ({ status }) => {
  const navigate = useNavigate();
const lowerStatus = status?.toLowerCase();
const [anchorEl, setAnchorEl] = React.useState(null);
let icon;
switch (lowerStatus) {
  case 'rejected':
    icon = <Close className="icon" />;
    break;
  case 'approved':
    icon = <Verified className="icon" />;
    break;
  case 'pending':
    icon = <InfoOutline className="icon" />;
    break;
  case 'resubmit':
    icon = <Replay className="icon" />;
    break;
  default:
    icon = null;
}

const label = (() => {
  switch (lowerStatus) {
    case 'approved':
      return 'Approved';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Rejected';
    case 'resubmit':
      return 'Resubmit';
    default:
      return status;
  }
})();

const handleMenuOpen = (e) => {
    e.stopPropagation(); // prevent row click in DataGrid
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleResubmit = () => {
  
     navigate('/createcoupon')
  

  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <StyledChip
        ownerState={{ status: label }}
        className={status}
        icon={icon}
        size="small"
        label={label}
        variant="outlined"
         onClick={() => {
        if (lowerStatus === 'resubmit') {
         navigate('/createcoupon');
          }
         }}
         sx={{
            cursor: lowerStatus === 'resubmit' ? 'pointer' : 'default'
          }}
      />
     {lowerStatus === 'rejected' && (
       <>
        
           <Button onClick={handleMenuOpen} size="small" sx={{ minWidth: 'auto', p: 0.5 }}>
             <InfoOutlined />
           </Button>
         
     
         <Dialog
           anchorEl={anchorEl}
           open={Boolean(anchorEl)}
           onClose={handleMenuClose}
           onClick={(e) => e.stopPropagation()} 
         >
        <Card sx={{width:'20rem'}}>
              <Box sx={{display:'flex',justifyContent:'center', background:'linear-gradient(195deg, #49a3f1, #1A73E8)', py:2,
                borderBottomLeftRadius:'12px',borderBottomRightRadius:'12px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
              }}>
              <WarningAmber sx={{fontSize:'48px', color:'#ffffff'}}/>
            </Box>
           <Typography sx={{p:3}}>
       
            <Typography sx={{color:'#2d2c2cff', textAlign:'center', fontSize:'18px'}}>This Coupon is rejected. 
            Please try to resubmit.</Typography> 
            </Typography>
        </Card>
         <Grid container sx={{borderTop:'1px solid #cccccc', py:0, my:0,  borderRadius:'0px'}} >
          <Grid size={{ xs: 6,sm:6, md: 6,  }} sx={{display:'flex', alignItems:'center', justifyContent:'center', 
            backgroundColor:'#fafafa', py:0, my:0, 
          }}>  
            <Button onClick={handleMenuClose} sx={{width:'100%', backgroundColor:'#000000', color:'#ffffff',
              borderRadius:'0px'
            }} >
             Cancel
           </Button></Grid>
          <Grid size={{ xs: 6,sm:6, md: 6,  }} sx={{display:'flex', alignItems:'center', justifyContent:'center',
            borderLeft:'1px solid #cccccc', background:'linear-gradient(195deg, #49a3f1, #1A73E8)',
          }}>
             <Button onClick={handleResubmit} sx={{width:'100%', color:'#fff',}}>
             <Replay sx={{ mr: 1 }} /> Resubmit
           </Button>
          </Grid>
         
           
         </Grid>
          
         </Dialog>
       </>
     )}

    </Box>
  );
};

export default React.memo(Status);
