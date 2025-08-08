import React from "react";
import { Button, Box, TextField, Typography, Paper } from "@mui/material";

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login action
    onLogin();
  };

  return (
    <Box className="login" display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box className="login-box" elevation={3} sx={{ padding: 4, width: 300 }}>
        <Box className='text-center' sx={{backgroundColor:'#000000', p:1}}>
         <img src="images/cashilogo.png" alt="logo" height="30px" width="auto" />
        </Box>
        <Typography variant="h5" mb={1} mt={2} sx={{color:'#ffffff'}}>Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField className="transparent-textfield" fullWidth margin="normal" label="Username" required variant="filled"
          />
          <TextField className="transparent-textfield" fullWidth margin="normal" label="Password" type="password" required variant="filled"
           />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background:'linear-gradient(195deg, #42424a, #191919)'}}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
