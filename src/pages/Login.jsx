
import React, { useState } from "react";
import { callPostApi } from "../components/API/ApiCallFunction";
import { Button, Box, TextField, Typography, Paper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const validate = () => {
    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
   
    return true;
  };

const handleSubmit = async (e) => {


    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        mod: "STORE_LOGIN",
        data_arr: {
         username: username, 
         password: password, 
        },
      };



      const apiResult = await callPostApi("store-login", payload);

         console.log("payload" + JSON.stringify(payload) )
         console.log("res" + JSON.stringify(apiResult) )
         if (apiResult.status === "202" && apiResult.data) {
           toast.success("Login successfully!");
          //  const { user_info } = apiResult.data;
          //  sessionStorage.setItem('storeid', user_info.store_id); 
          //  console.log("storeid" + user_info.store_id )
          //  sessionStorage.setItem('storename', user_info.store_name); 
          //  sessionStorage.setItem('ownername', user_info.owner_name); 
          //  sessionStorage.setItem('storeaddress', user_info.store_address); 
           onLogin(apiResult.data);
           navigate("/dashboard"); 
         } else {
           if (apiResult.status === "401") {
             setLoading(false);
             toast.error(apiResult.data.error || "Validation error");
           } else {
             setLoading(false);
             toast.error("Failed toLogin");
           }
         }
       } catch (error) {
         console.error(error);
         toast.error("Something went wrong. Please try again.");
       }
  };

  return (
    
    <Box className="login" display="flex" justifyContent="center" alignItems="center" height="100vh">
      <ToastContainer />
      <Box className="login-box" elevation={3} sx={{ padding: 4, width: 300 }}>
        <Box className='text-center' sx={{backgroundColor:'#000000', p:1}}>
         <img src="images/cashilogo.png" alt="logo" height="30px" width="auto" />
        </Box>
        <Typography variant="h5" mb={1} mt={2} sx={{color:'#ffffff'}}>Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField className="transparent-textfield" fullWidth margin="normal" label="Username" required variant="filled"
          value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <TextField className="transparent-textfield" fullWidth margin="normal" label="Password" type="password" required variant="filled"
           value={password}  onChange={(e) => setPassword(e.target.value)}
           />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background:'linear-gradient(195deg, #42424a, #191919)',
            color:'#ffffff'
          }}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;