import { Box, Typography, Button, Container, Card, Divider } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Add, ArrowCircleRight, 
   LocalOffer, Diversity3, QrCode, QrCode2, QrCodeScanner } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GenerateQRCode from "./QRCode/GenerateQRCode";
import { useState } from "react";


function DashboardPlus() {

const [open, setOpen] = useState(false);
const navigate = useNavigate();
  return (
    <Box>

      
      <Box p={3}>
       
        <Container >
            <Box display="flex" justifyContent="space-between" flexWrap={"wrap"} >
              <Box display="flex" alignItems="center" >
                <Button sx={{background:'linear-gradient(195deg, #EC407A, #D81B60)', color:'#ffffff',
                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                   }} onClick={()=> setOpen(true)}><Add/> Generate QR Coupon</Button>
                     <GenerateQRCode open={open} onClose={()=> setOpen(false)} />

                 <Button sx={{background:'linear-gradient(195deg, #42424a, #191919)', color:'#ffffff',ml:1,
                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                   }} onClick={() => navigate('loadQR')}><QrCode2 sx={{mr:1}}/>QR Coupon List</Button>

              </Box>
                    
                  {/* <Button onClick={()=> navigate('/dashboard')}>
                    <img src={cashilogo} alt="cashi logo" style={{height:'30px', width:'auto'}} />
                  </Button> */}
            </Box>
           
            <Grid container rowSpacing={6} columnSpacing={2} my={6}>
            <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
            <Card className="dashcard" sx={{padding:'10px 15px', backgroundColor:'#ffffff', }} >
                <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background: 'linear-gradient(195deg, #42424a, #191919)'}}>
                    <QrCode sx={{fontSize:'38px', color:'#ffffff'}}/>
                 </Box>
               </Grid>
               <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Generated QR Coupons</Typography>
                <Typography variant="h4" >0</Typography>
               </Grid>
              
                </Grid>
               
                <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('generatedQRdt')}>View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
            <Grid size={{ xs: 12,sm:12, md: 6}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
                <Card className="dashcard" sx={{padding:'10px 15px', }} >
                <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox"  variant="gradient" color="#30325E"
                 sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)'}}>
                  
                    <LocalOffer sx={{fontSize:'38px', color:'#ffffff'}} />
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Loaded QR Coupons</Typography>
                <Typography variant="h4">0</Typography>
               
                 </Grid>
                </Grid>
               
                 <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('loadedQRdt')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
           <Grid size={{ xs: 12,sm:12, md: 6}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
                <Card className="dashcard" sx={{padding:'10px 15px', }}>
                <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background:'linear-gradient(195deg, #66BB6A, #43A047)'}}>
                    <QrCodeScanner sx={{fontSize:'38px', color:'#ffffff'}}/>
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Activated QR Coupons</Typography>
                 <Typography variant="h4">0</Typography>
               
                 </Grid>
                </Grid>
                
                  <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                    <Button sx={{fontWeight:'600'}} onClick={() => navigate('activatedQRdt')}
                    >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
                     </Box>
            </Card>
            </Grid>
             <Grid size={{ xs: 12,sm:12, md: 6}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
                <Card className="dashcard" sx={{padding:'10px 15px', }}><Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox" 
                 sx={{background: 'linear-gradient(195deg, #EC407A, #D81B60)'}}>
                    <Diversity3 sx={{fontSize:'38px', color:'#ffffff'}} />
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h4">0</Typography>
                 </Grid>
                </Grid>
               
            </Card>
             <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('totalCustomerPlusDt')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Grid> 
            </Grid>
          
        </Container>
      </Box>

    </Box>
  );
}


export default DashboardPlus;
