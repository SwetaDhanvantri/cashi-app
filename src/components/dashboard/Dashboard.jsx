import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Card, Divider } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Add, ArrowCircleRight, Style, LocalOffer, Widgets, Diversity3, QrCode, QrCode2 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import campimg from '../../assets/promotion.png'
import cashipluslogo from '../../assets/CashiPluslogo.png'
import { callPostApi } from "../../components/API/ApiCallFunction";
import GradientLoader from "../CommanComponents/GradientLoader";
function Dashboard() {

const user = JSON.parse(sessionStorage.getItem("user") || "{}");
const [open, setOpen] = useState(false);
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
 const [datar, setDatar] = useState({
  total_customer: 0,
  total_issued: 0,
  total_redeem: 0,
});

  const dashbaordApi = async () => {
    setLoading(true);
    const storeid = user.store_info.store_id;

    const payload = {
      mod: "CASHI_DASHBOARD_INFO",
      data_arr: { store_id: storeid, start: "1", limit: "100" },
    };
    const apiResult = await callPostApi("cashi-dashboard", payload);
    console.log("API Payload:", JSON.stringify(payload));
    console.log("API Result:", JSON.stringify(apiResult));
   if (apiResult.status === "200" && apiResult.data) {
     const item = apiResult.data;
     setDatar({
       total_customer: item.total_customer || 0,
       total_issued: item.total_issued || 0,
       total_redeem: item.total_redeem || 0,
     });
     setLoading(false);
   } 
 else {
      setLoading(false);
    }
  };

  useEffect(() => {
    dashbaordApi();
  }, []);
 
  return (
    <Box>

      
      <Box>
       
        <Container >
            
            <Box display="flex" justifyContent="space-between" flexWrap={"wrap"} >
               
              <Box display="flex" alignItems="center" >
              <Button variant="contained" onClick={() => navigate('/createcoupon')}> <Add /> Create Coupon </Button>
                 <Button variant="contained" sx={{ml:1, background:'linear-gradient(195deg, #66BB6A, #43A047)'}} onClick={() => navigate('/couponlist')}> Coupon List </Button>
                  {/* <Button variant="contained" sx={{ml:'12px', backgroundColor:'#000000', color:'#ffffff'}} 
                  onClick={() => navigate('/createpromotion')}>
                   <Add /> Create Promotion</Button> */}
    
                <Button  sx={{backgroundColor:'#eee', ml:1,
                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                   }} onClick={() => navigate('/campaignList')}><img src={campimg} alt="campaign" style={{height:'30px', width:'auto'}} /> </Button>
                   
              
              </Box>
                 <Button onClick={()=> navigate('/dashboardPlus')}>
                    <img src={cashipluslogo} alt="cashi plus" style={{height:'60px', width:'auto'}} />
                  </Button>
            </Box>
           
  
              <Grid   container rowSpacing={6} columnSpacing={2} my={6}>
            <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
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
                <Typography variant="h4" >{datar.total_issued}</Typography>
               </Grid>
              
                </Grid>
               
                <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/issuedList')}>View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
            <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
                <Card className="dashcard" sx={{padding:'10px 15px', }} >
                <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:6, md: 4,}}>
                 <Box className="icobox"  variant="gradient" color="#30325E"
                 sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)'}}>
                  
                    <LocalOffer sx={{fontSize:'38px', color:'#ffffff'}} />
                 </Box>
              
               </Grid>
                  <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{mb:4}}>
                 <Typography variant="h6">Reedemed Coupon</Typography>
                <Typography variant="h4">{datar.total_redeem}</Typography>
               
                 </Grid>
                </Grid>
               
                 <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/redeemedList')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Card>
            </Grid>
           <Grid size={{ xs: 12,sm:12, md: 6,}} position="relative" sx={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
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
                 <Typography variant="h4">0</Typography>
               
                 </Grid>
                </Grid>
                
                  {/* <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                    <Button sx={{fontWeight:'600'}} onClick={() => navigate('/totalvalue')}
                    >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
                     </Box> */}
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
                  <Typography variant="h4">{datar.total_customer}</Typography>
                 </Grid>
                </Grid>
               
            </Card>
             <Box position="absolute" bottom="0px" left="0px" width="100%" sx={{ textAlign:'center'}}>
                    <Divider sx={{borderColor:'#6c757d;'}} />
                <Button sx={{fontWeight:'600'}} onClick={() => navigate('/customerList')}
                >View More <ArrowCircleRight sx={{fontSize:'20px', marginLeft:"8px", marginBottom:'3px'}} /> </Button>
            </Box>
            </Grid>
            </Grid>
          
        </Container>
         {loading && <GradientLoader text="Loading" />}
      </Box>
 
     <style>
  {`
    .promotion:hover {
      background-color: #ffffff;
    }
  `}
</style>

    </Box>
  );
}


export default Dashboard;
