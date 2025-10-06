import { Card, Typography,Grid } from '@mui/material';


import logo from '../../../assets/cashilogo.png'
import qrimg from '../../../assets/qr_code.png'

export function Template1() {
     
   return (
    <>
       <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #42424a, #191919)', color:'#ffffff',
               boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
               maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto'  }}>
               <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                <img src={logo} alt="" style={{height:'30px', width:'auto'}} />
                <Typography variant='h6' sx={{fontSize:'12px', color:'#a1a1a1ff'}}> Sr No: 1234567890</Typography>
               </Typography>
               <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
                   <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{fontStyle:'italic'}}>
                    <Typography variant='h6' sx={{fontSize:'12px', color:'#ccc'}}> Please scan the QR Code
                      with Cashi App to claim your coupon.
                    </Typography>
                    <Typography variant='h6' sx={{fontSize:'12px', color:'#ccc', mt:1}}> 
                     *Terms & Conditions apply.
                        <Typography variant='h6' sx={{fontSize:'12px', color:'#ccc', }}> 
                          Coupon valid till 31/12/2025
                        </Typography>
                    </Typography>
                   </Grid>
                   <Grid size={{ xs: 12,sm:6, md: 4,}} sx={{textAlign:'right'}} >
                      <img src={qrimg} alt="" style={{height:'80px', width:'auto'}} />
                   </Grid>
              
               </Grid>
              </Card>
    </>
  );
}
export function Template2() {
     
   return (
    <>
      <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto'}}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          Logo
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: 1234567890</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{fontStyle:'italic'}}>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Please scan the QR Code
                with Cashi App to claim your coupon.
              </Typography>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', mt:1}}> 
               *Terms & Conditions apply.
                  <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', }}> 
                    Coupon valid till 31/12/2025
                  </Typography>
              </Typography>
             </Grid>
             <Grid size={{ xs: 12,sm:6, md: 4,}} sx={{textAlign:'right'}} >
                <img src={qrimg} alt="" style={{height:'80px', width:'auto'}} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
export function Template3() {
     
   return (
    <>
  {/* Coupon3 */}
         <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #66BB6A, #43A047)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto' }}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          Logo
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: 1234567890</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{fontStyle:'italic'}}>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Please scan the QR Code
                with Cashi App to claim your coupon.
              </Typography>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', mt:1}}> 
               *Terms & Conditions apply.
                  <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', }}> 
                    Coupon valid till 31/12/2025
                  </Typography>
              </Typography>
             </Grid>
             <Grid size={{ xs: 12,sm:6, md: 4,}} sx={{textAlign:'right'}} >
                <img src={qrimg} alt="" style={{height:'80px', width:'auto'}} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
export function Template4() {
     
   return (
    <>
  <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #EC407A, #D81B60)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%',minHeight:'180px' , maxHeight:'auto'  }}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          Logo
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: 1234567890</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 12,sm:6, md: 8,}} sx={{fontStyle:'italic'}}>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Please scan the QR Code
                with Cashi App to claim your coupon.
              </Typography>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', mt:1}}> 
               *Terms & Conditions apply.
                  <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', }}> 
                    Coupon valid till 31/12/2025
                  </Typography>
              </Typography>
             </Grid>
             <Grid size={{ xs: 12,sm:6, md: 4,}} sx={{textAlign:'right'}} >
                <img src={qrimg} alt="" style={{height:'80px', width:'auto'}} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
