import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Grid, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountBalanceWallet, CurrencyRupee, Info} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import StoreDialog from "./StoreDialog";

function Navbar({ onLogout }) {
const navigate = useNavigate();

  return (
    <AppBar position="sticky" style={{backgroundColor:'#000000',marginBottom:'40px' }}>
      <Toolbar sx={{display:'flex', alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
        <Typography variant="h6">
          <img src="images/cashilogo.png" alt="logo" height="30px" width="auto" />
        </Typography>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between', flexWrap:'wrap'}}>

      
           <Grid sx={{display:'flex', alignItems:'center',justifyContent:'space-between', flexWrap:'wrap' ,borderRadius:'6px', mx:'10px', px:'7px', py:'5px',
            backgroundColor:'#ffd351', color:'#000000', my:'5px'
           }}>
            
            <Typography sx={{margin:'8px', my:'0px', mx:'5px'}}>
              <Info />  Insufficient balance. Please Top up your wallet. 
               <Button sx={{borderRadius:'25px', background:'#000000', color:'#dbdbdb', fontSize:'12px', mx:1}}
                onClick={()=> navigate('/wallet')} >Top up now</Button>
            </Typography>
           
           </Grid>
           <Grid container sx={{borderRadius:'6px', border:'1px solid #dbdbdbff', mx:'10px', my:'5px', cursor:'pointer'}} 
           onClick={()=> navigate('/wallet')} >
             <Grid size={3}>
                 <Typography sx={{px:'7px', py:'5px' , backgroundColor:'#888888', borderTopLeftRadius:'5px',
                   borderBottomLeftRadius:'5px'
                 }}>
                  <AccountBalanceWallet  onClick={()=> navigate('/wallet')} />
                 </Typography>
             </Grid>
              <Grid size={9} sx={{display:'flex', alignItems:'center', px:1}}  >
              <CurrencyRupee /> 120000666.80
             </Grid>
         
           </Grid>
          
           <StoreDialog />
            {/* <Typography sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', px:'7px', py:'5px', borderRadius:'6px',my:'5px'}} >
            <Store /> Shopview Store
           </Typography> */}
         <IconButton sx={{background: 'linear-gradient(195deg, #66BB6A, #43A047)', color:'#ffffff', borderRadius:'6px'
          , ml:'10px',my:'5px',
         }} onClick={onLogout}>
          <LogoutIcon sx={{ fontSize:'20px'}} />
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
