import { AccountBalanceWallet, CurrencyRupee, InfoOutline, Sync } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import PriceTable from './PriceTable';

export default function Wallet() {
      const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h6"  gutterBottom sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
        p: 1, color: '#ffffff',  borderRadius: '4px', mb: 3,}}>
       <AccountBalanceWallet/>  Wallet </Typography>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
         <Button variant="contained" sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() => navigate('/dashboard')} > Back </Button>
      </Box>

       <Box sx={{backgroundColor:'#f2f2f2', borderRadius:'8px',
        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;'}}>
        <Typography sx={{px:2, py:1}} ><Sync/> Last Updated at: 12 Aug 2025</Typography>
         <Grid container spacing={2} sx={{backgroundColor:'#ffffff',  borderTopLeftRadius:'12px', borderTopRightRadius:'12px',
          borderBottomRightRadius:'8px',borderBottomLeftRadius:'8px',
        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;', py:2 ,px:2}}>
           <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
             <Typography sx={{mb:1, color:'#888'}}>Wallet Balance</Typography>
             <Box sx={{display:'flex', alignItems:'center'}}>
              <CurrencyRupee sx={{fontSize:'35px',color:'#0a32d4ff'}} /> 
              <Typography variant="h4" sx={{color:'#0a32d4ff'}}>188.76</Typography>
              </Box> 
             <Box sx={{display:'flex', my:3}}>
              <Button variant="contained" sx={{background:'linear-gradient(195deg, #66BB6A, #43A047)'}}>Add Balance</Button>
              <Button variant="contained" sx={{mx:1}}>Manage Billing</Button>
             </Box>
             
           </Grid>
            <Grid item size={{ xs: 12,sm:12, md: 6,  }} sx={{borderLeft:'1px solid #ccc', px:2,}}>
                <Typography sx={{mb:1, color:'#888'}}>Credit Balance 
                    <span><InfoOutline sx={{fontSize:'18px', mx:1}}/></span></Typography>
                  <Box sx={{display:'flex', alignItems:'center'}}>
                    <CurrencyRupee sx={{fontSize:'35px',color:'#098665'}} /> 
                    <Typography variant="h4" sx={{color:'#098665'}}>98.76</Typography>
                </Box> 
           </Grid>
         </Grid>

         
       </Box>  
       <Box sx={{my:2}}>
            <PriceTable  />
         </Box>   
    </Container>
  )
}
