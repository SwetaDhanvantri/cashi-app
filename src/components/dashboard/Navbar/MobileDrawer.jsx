import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AccountBalanceWallet, CurrencyRupee,  Store } from '@mui/icons-material';
import { Menu } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MobileDrawer() {
  const navigate = useNavigate();
  const [opend, setOpend] = React.useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const toggleDrawer = (newOpen) => () => {
    setOpend(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
     <Typography sx={{textAlign:'center', p:2,background:'linear-gradient(195deg, #49a3f1, #1A73E8)'}}>
       <img src={user.store_image[0]} alt="external-link" style={{width:'60px', marginLeft:'4px', filter: 'invert(1)'}} />
     </Typography>
     <Box sx={{ borderRadius:'6px',my:'5px', border:'1px solid #ccc', color:'#000',  ml:2,
      textTransform:'none',  fontSize:'16px',
            }} > <Store />
         
              {user.store_info?.store_name?.length > 19
              ? user.store_info.store_name.substring(0, 19) + "..."
              : user.store_info?.store_name}
      </Box>
        <Box sx={{borderRadius:'6px', border:'1px solid #dbdbdbff', mx:'10px', my:'5px', cursor:'pointer',
            display:'flex', alignItems:'center'
           }} 
           onClick={()=> navigate('/wallet')} >
             <Typography sx={{width:'40px'}}>
                 <Typography sx={{px:'7px', py:'5px' , backgroundColor:'#888888', borderTopLeftRadius:'5px',
                   borderBottomLeftRadius:'5px'
                 }}>
                  <AccountBalanceWallet  onClick={()=> navigate('/wallet')} />
                 </Typography>
             </Typography>
              <Typography sx={{display:'flex', alignItems:'center', px:1}}  >
              <CurrencyRupee /> 0.00
             </Typography>
            
           
           </Box>
          
      <Divider />
     
    </Box>
  );
  return (
   <div>
      <Button onClick={toggleDrawer(true)} sx={{color:'#fff'}}><Menu /> </Button>
      <Drawer open={opend} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}



