import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Grid, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
 } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountBalanceWallet, Celebration, CurrencyRupee, Info, WarningAmber} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import StoreDialog from "./StoreDialog";
import { Card } from "react-bootstrap";
import partypopper from '../../../assets/partypopper.gif';
import MobileDrawer from "./MobileDrawer";

function Navbar({ onLogout }) {
const navigate = useNavigate();
 const [open, setOpen] = useState(false);
 const [claimOpen, setClaimOpen] = useState(false);
 const handleLogoutClick = () => {
    setOpen(true); // open dialog
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    onLogout(); // call parent logout
  };

   const handleClaimClick = () => {
    setClaimOpen(true);
  };

  const handleClaimClose = () => {
    setClaimOpen(false);
    navigate("/wallet"); // go to wallet page after claim
  };
  return (
    <>
      <AppBar position="sticky" style={{backgroundColor:'#000000',marginBottom:'40px' }}>
      <Toolbar sx={{display:'flex', alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
        <Typography variant="h6">
          <img src="images/cashilogo.png" alt="logo" height="30px" width="auto" style={{cursor:'pointer'}} onClick={()=> {navigate('/dashboard')}} />
        </Typography>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between', flexWrap:'wrap'}}>

      
           {/* <Grid sx={{display:'flex', alignItems:'center',justifyContent:'space-between', flexWrap:'wrap' ,borderRadius:'6px', mx:'10px', px:'7px', py:'5px',
            backgroundColor:'#ffd351', color:'#000000', my:'5px'
           }}>
            
            <Typography sx={{margin:'8px', my:'0px', mx:'5px'}}>
              <Info />  Insufficient balance. Please Top up your wallet. 
               <Button sx={{borderRadius:'25px', background:'#000000', color:'#dbdbdb', fontSize:'12px', mx:1}}
                onClick={()=> navigate('/wallet')} >Top up now</Button>
            </Typography>
           
           </Grid> */}
           <Grid sx={{display:'flex', alignItems:'center',justifyContent:'space-between', flexWrap:'wrap' ,borderRadius:'6px', mx:'10px', px:'7px', py:'5px',
             backgroundColor:' #f1c12d', color:'#000', my:'5px'
           }}>
            
            <Typography sx={{margin:'8px', my:'0px', mx:'5px',}}>
              <Celebration />  You’ve received a Welcome Balance of ₹500!
               <Button sx={{borderRadius:'25px', background:'#000000', color:'#ffffff', fontSize:'12px', mx:1}}
                onClick={handleClaimClick} >Claim it now</Button>
            </Typography>
           
           </Grid>
           <Box sx={{borderRadius:'6px', border:'1px solid #dbdbdbff', mx:'10px', my:'5px', cursor:'pointer',
            display:'flex', alignItems:'center'
           }} 
           onClick={()=> navigate('/wallet')} >
             <Box sx={{width:'40px'}}>
                 <Box sx={{px:'7px', py:'5px' , backgroundColor:'#888888', borderTopLeftRadius:'5px',
                   borderBottomLeftRadius:'5px'
                 }}>
                  <AccountBalanceWallet  onClick={()=> navigate('/wallet')} />
                 </Box>
             </Box>
              <Typography sx={{display:'flex', alignItems:'center', px:1}}  >
              <CurrencyRupee /> 0.00
             </Typography>
            
           
           </Box>
          
           <StoreDialog />
            {/* <Typography sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', px:'7px', py:'5px', borderRadius:'6px',my:'5px'}} >
            <Store /> Shopview Store
           </Typography> */}
         <IconButton sx={{background: 'linear-gradient(195deg, #66BB6A, #43A047)', color:'#ffffff', borderRadius:'6px'
          , ml:'10px',my:'5px',
         }} onClick={handleLogoutClick}>
          <LogoutIcon sx={{ fontSize:'20px'}} />
        </IconButton>
         {/* <MobileDrawer/> */}
        </Box>
        
      </Toolbar>
    </AppBar>

    {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
         <Card sx={{width:'20rem'}}>
              <Box sx={{display:'flex',justifyContent:'center', background:'linear-gradient(195deg, #49a3f1, #1A73E8)', py:2,
               boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
              }}>
              <WarningAmber sx={{fontSize:'48px', color:'#ffffff'}}/>
            </Box>
        
        </Card>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout}   variant="gradient" autoFocus sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)',
            color:'#ffffff'
          }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Claim Success Dialog */}
      <Dialog open={claimOpen} onClose={handleClaimClose}>
        <DialogTitle variant="h4" sx={{textAlign:'center', fontWeight:'bold', }}>
          Congratulations!
         <Typography><img src={partypopper} alt="party popper" height="250px" width="auto" />
         </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="h6" sx={{color:'#000', textAlign:'center'}}>
            <span style={{color:'#2bbf67'}}>₹500</span> has been successfully added to your wallet.  
            Enjoy your rewards!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClaimClose}
            variant="contained"
            sx={{background:'linear-gradient(195deg, #66BB6A, #43A047)'}}
            fullWidth
          >
            Go to Wallet
          </Button>
        </DialogActions>
      </Dialog>
      </>

      
  
  );
}

export default Navbar;
