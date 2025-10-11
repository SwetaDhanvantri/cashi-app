import { Card, Typography,Grid } from '@mui/material';
import logo from '../../../assets/cashilogo.png'
import { QRCodeCanvas } from 'qrcode.react';

export function Template1({ qr = {}, user = {} }) {
     
   return (
    <>
       <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #42424a, #191919)', color:'#ffffff',
               boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
               maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto'  }}>
               <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                 <img src={user.store_image?.[0] || logo} alt="Logo" style={{ height: 30 }} />
                <Typography variant='h6' sx={{fontSize:'12px', color:'#a1a1a1ff'}}> Sr No: {qr?.serial || 'N/A'}</Typography>
               </Typography>
               <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
                   <Grid size={{ xs: 8,sm:8, md: 8,}} sx={{fontStyle:'italic'}}>
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
                   <Grid size={{ xs: 4,sm:4, md: 4,}} sx={{textAlign:'right'}} >
                     <QRCodeCanvas value={qr.qrValue} size={80} />
                   </Grid>
              
               </Grid>
              </Card>
    </>
  );
}
export function Template2({ qr = {}, user = {} }) {
     
   return (
    <>
      <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #0c1543ff, #0c1543ff)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto'}}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
           LOGO
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: {qr?.serial || 'N/A'}</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 8,sm:8, md: 8,}} sx={{fontStyle:'italic'}}>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Please scan the QR Code
                with ..... App to claim your coupon.
              </Typography>
              <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', mt:1}}> 
               *Terms & Conditions apply.
                  <Typography variant='h6' sx={{fontSize:'12px', color:'#fff', }}> 
                    Coupon valid till DD/MM/YYYY
                  </Typography>
              </Typography>
             </Grid>
             <Grid size={{ xs: 4,sm:4, md: 4,}} sx={{textAlign:'right'}} >
                <QRCodeCanvas value={qr.qrValue} size={80} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
export function Template3({ qr = {}, user = {} }) {
     
   return (
    <>
  {/* Coupon3 */}
         <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #008080, #006241)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%', minHeight:'180px' , maxHeight:'auto' }}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
           <img src={user.store_image?.[0] || logo} alt="Logo" style={{ height: 30 }} />
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: {qr?.serial || 'N/A'}</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 8,sm:8, md: 8,}} sx={{fontStyle:'italic'}}>
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
             <Grid size={{ xs: 4,sm:4, md: 4,}} sx={{textAlign:'right'}} >
               <QRCodeCanvas value={qr.qrValue} size={80} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
export function Template4({ qr = {}, user = {} }) {
     
   return (
    <>
  <Card sx={{ p: 2,m:2,background:'linear-gradient(195deg, #C6011F, #9e1b32)', color:'#ffffff',
         boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
         maxWidth:'320px', width:'100%',minHeight:'180px' , maxHeight:'auto'  }}>
         <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          <img src={user.store_image?.[0] || logo} alt="Logo" style={{ height: 30 }} />
          <Typography variant='h6' sx={{fontSize:'12px', color:'#fff'}}> Sr No: {qr?.serial || 'N/A'}</Typography>
         </Typography>
         <Grid container rowSpacing={2} columnSpacing={2}  sx={{ mt:2}}>
             <Grid size={{ xs: 8,sm:8, md: 8,}} sx={{fontStyle:'italic'}}>
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
             <Grid size={{ xs: 4,sm:4, md: 4,}} sx={{textAlign:'right'}} >
               <QRCodeCanvas value={qr.qrValue} size={80} />
             </Grid>
        
         </Grid>
       </Card>
    </>
  );
}
