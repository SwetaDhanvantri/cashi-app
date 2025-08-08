import React from 'react'
import Button from '@mui/material/Button';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CreateCouponDialog() {
     
 const navigate = useNavigate();
  return (
     <Typography sx={{ my:6}}>
    
      <Container>
       
        <Box>
          <Typography id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12,sm:6, md: 6,}}>
              <TextField id="outlined-basic" label="Coupon Title" variant="outlined" fullWidth />
              </Grid>
                <Grid size={{ xs: 12,sm:6, md: 6,  }}>
              <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          
          </Typography>
        </Box>
      
        <Box className="my-4 text-center" > 
          <Button variant="contained" sx={{backgroundColor:'#000000', color:'#ffffff'}} 
          onClick={()=> navigate('/dashboard')}>Back</Button>
         <Button variant="contained" sx={{mx:1}} autoFocus> Save </Button>
        
        </Box>
          
      </Container>
    </Typography>
  )
}
