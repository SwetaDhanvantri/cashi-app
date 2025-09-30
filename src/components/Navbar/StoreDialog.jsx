import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { AccountCircle, AddBusiness, ContactPhone, PinDrop, Store } from '@mui/icons-material';
import { Grid, InputAdornment, TextField } from '@mui/material';

export default function StoreDialog() {
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <React.Fragment>
      <Button sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', px:'7px', py:'5px', borderRadius:'6px',my:'5px',
        color:'#fff'
      }} onClick={handleClickOpen}>
          <Store />
          {/* {user.store_info.store_name} */}
           {user.store_info?.store_name?.length > 19
    ? user.store_info.store_name.substring(0, 19) + "..."
    : user.store_info?.store_name}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
            {/* Offer Title */}
            <Grid item size={{ xs: 12,sm:12, md: 12,  }}>
              <TextField
               id="input-with-icon-textfield"
               label="Store Name"
               value={user.store_info.store_name}
                InputProps={{
               readOnly: true,}}
                InputLabelProps={{
                 style: { color: '#888' },
                 }}
               style={{width:'100%'}}
               slotProps={{
                 input: {
                   startAdornment: (
                     <InputAdornment position="start">
                       <Store sx={{ color:'#1A73E8' }} />
                     </InputAdornment>
                   ),
                        style:{color:'#000', fontWeight:500, pointerEvents: 'none' }
                 },
               }}
               variant="standard"
             />
            </Grid>
               <Grid item size={{ xs: 12,sm:12, md: 12,  }}>
              <TextField
               id="input-with-icon-textfield"
               label="Store Address"
               value={user.store_info.store_address}
               multiline
               maxRows={2}
                InputProps={{
               readOnly: true,
                }}
                style={{width:'100%'}}
               slotProps={{
                 input: {
                   startAdornment: (
                     <InputAdornment position="start">
                       <PinDrop sx={{ color:'#1A73E8' }}  />
                     </InputAdornment>
                   ), 
                   style:{color:'#000', fontWeight:500, pointerEvents: 'none'}
                 },
               }}
               variant="standard"
                InputLabelProps={{
                 style: { color: '#888' },
                 }}
             />
            </Grid>

               <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
              <TextField
               id="input-with-icon-textfield"
               label="Contact Name"
               value={user.store_info.owner_name}
                InputProps={{
               readOnly: true,
                }}
                 InputLabelProps={{
                 style: { color: '#888' },
                 }}
                style={{width:'100%'}}
               slotProps={{
                 input: {
                   startAdornment: (
                     <InputAdornment position="start">
                       <AccountCircle sx={{ color:'#1A73E8' }}  />
                     </InputAdornment>
                   ),
                  style:{color:'#000', fontWeight:500, pointerEvents: 'none'}
                 },
               }}
               variant="standard"
             />
            </Grid>
             <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
              <TextField
               id="input-with-icon-textfield"
               label="Contact"
               value="+91 8098763456"
                InputProps={{
               readOnly: true,
                }}
                 InputLabelProps={{
                 style: { color: '#888', pointerEvents: 'none' },
                 }}
                style={{width:'100%'}}
               slotProps={{
                 input: {
                   startAdornment: (
                     <InputAdornment position="start">
                       <ContactPhone sx={{ color:'#1A73E8' }}  />
                     </InputAdornment>
                   ),
                 },
                 style:{color:'#000', fontWeight:500, pointerEvents: 'none'}
               }}
               variant="standard"
             />
            </Grid>
            <Grid item size={{ xs: 12,sm:12, md: 12,  }} className="d-flex justify-content-center align-items-center mt-4">
                 <Button onClick={handleClose} sx={{background: 'linear-gradient(195deg, #42424a, #191919)',color:'#fff', px:4,
                    mx:2}}>Close</Button>
               <a href="https://play.google.com/store/apps/details?id=com.loyalty.cashi&hl=en_IN" target="_blank" rel="noopener noreferrer">
               <Button sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color:'#fff', px:2}}>
                   <AddBusiness/> Manage Store</Button></a> </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      
      </Dialog>
    </React.Fragment>
  )
}
