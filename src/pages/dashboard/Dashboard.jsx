import React from "react";
import { Box, Typography, Button, Container, Card, Divider } from "@mui/material";
import Navbar from "../../components/Navbar";
import Grid from '@mui/material/Grid';
import { Add, ArrowCircleRight, Style, LocalOffer, Widgets, Diversity3 } from "@mui/icons-material";
import CreateCouponDialog from "./CreateCouponDialog";
import CreatePromotionDialog from "./CreatePromotionDialog";
import { useNavigate } from "react-router-dom";


function Dashboard() {
const navigate = useNavigate();
  return (
    <Box>
    
      
      <Box p={3}>
       
        <Container >
            <Box display="flex" justifyContent="end">
                 <Button variant="contained" onClick={() => navigate('/createcoupon')}> <Add /> Create Coupon </Button>
                  <Button variant="contained" sx={{ml:'12px', backgroundColor:'#000000', color:'#ffffff'}} 
                  onClick={() => navigate('/createpromotion')}>
                   <Add /> Create Promotion</Button>
            </Box>
           
            <Grid container rowSpacing={6} columnSpacing={2} my={6}>
            <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative">
            <Card className="dashcard" sx={{padding:'10px 15px', backgroundColor:'#ffffff', }} >
                <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background: 'linear-gradient(195deg, #42424a, #191919)'}}>
                    <Style sx={{fontSize:'38px', color:'#ffffff'}}/>
                 </Box>
               </Grid>
               <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Issued Coupon</Typography>
                <Typography variant="h4" >50</Typography>
               </Grid>
              
                </Grid>
               
                <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/issued')}>View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
            <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative">
                <Card className="dashcard" sx={{padding:'10px 15px', }} >
                <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox"   variant="gradient" color="#30325E"
                 sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)'}}>
                  
                    <LocalOffer sx={{fontSize:'38px', color:'#ffffff'}} />
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Reedemed Coupon</Typography>
                <Typography variant="h4">50</Typography>
               
                 </Grid>
                </Grid>
               
                 <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/redeemed')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
           <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative">
                <Card className="dashcard" sx={{padding:'10px 15px', }}>
                <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background:'linear-gradient(195deg, #66BB6A, #43A047)'}}>
                    <Widgets sx={{fontSize:'38px', color:'#ffffff'}}/>
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Total Value</Typography>
                 <Typography variant="h4">50</Typography>
               
                 </Grid>
                </Grid>
                
                  <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                    <Button sx={{fontWeight:'600'}} onClick={() => navigate('/totalvalue')}
                    >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
            <Grid size={{ xs: 12,sm:12, md: 6}} position="relative">
                <Card className="dashcard" sx={{padding:'10px 15px', }}><Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background: 'linear-gradient(195deg, #EC407A, #D81B60)'}}>
                    <Diversity3 sx={{fontSize:'38px', color:'#ffffff'}} />
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h4">50</Typography>
                 </Grid>
                </Grid>
               
            </Card>
             <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/totalcustomer')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Grid>
            </Grid>
          
        </Container>
      </Box>
    </Box>
  );
}


export default Dashboard;
