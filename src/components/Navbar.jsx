import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Grid, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountBalanceWallet, CurrencyRupee, Info, Store } from "@mui/icons-material";

function Navbar({ onLogout }) {
  return (
    <AppBar position="static" style={{backgroundColor:'#000000'}}>
      <Toolbar sx={{flexWrap:'wrap'}}>
        <Typography variant="h6" sx={{ flexGrow: 1 ,}}>
          <img src="images/cashilogo.png" alt="logo" height="30px" width="auto" />
        </Typography>
           <Grid sx={{display:'flex', alignItems:'center',justifyContent:'space-between', flexWrap:'wrap' ,borderRadius:'6px', mx:'15px', px:'7px', py:'5px',
            backgroundColor:'#ffd351', color:'#000000', my:'5px'
           }}>
            
            <Typography sx={{margin:'8px', my:'0px', mx:'5px'}}>
              <Info />  Insufficient balance. Please Top up your wallet. 
            </Typography>
            <Button sx={{borderRadius:'25px', background:'#000000', color:'#dbdbdb', fontSize:'12px'}}>Top up now</Button>
           </Grid>
           <Grid container sx={{borderRadius:'6px', border:'1px solid #dbdbdbff', mx:'15px', my:'5px'}}>
             <Grid size={4} >
                 <Typography sx={{px:'7px', py:'5px' , backgroundColor:'#888888', borderTopLeftRadius:'5px',
                   borderBottomLeftRadius:'5px'
                 }}>
                  <AccountBalanceWallet />
                 </Typography>
             </Grid>
              <Grid size={8} sx={{display:'flex', alignItems:'center'}} >
              <CurrencyRupee /> 12.80
             </Grid>
         
           </Grid>
          
     
            <Typography sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', px:'7px', py:'5px', borderRadius:'6px'}}>
            <Store /> Shopview Store
           </Typography>
         <IconButton sx={{background: 'linear-gradient(195deg, #66BB6A, #43A047)', color:'#ffffff', borderRadius:'6px'
          , ml:'15px',
         }} onClick={onLogout}>
          <LogoutIcon sx={{ fontSize:'20px'}} />
        </IconButton>
      
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
