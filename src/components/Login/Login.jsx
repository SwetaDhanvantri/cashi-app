
import { useState } from "react";
import { callPostApi } from "../../components/API/ApiCallFunction";
import { Button, Box, TextField, Typography } from "@mui/material";
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
          const successData = apiResult.data.success; 
           const storeInfo = successData.store_info;
         
           if (storeInfo) {
             sessionStorage.setItem("user", JSON.stringify(successData));
             console.log("User stored:", successData);
           }
          
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
        <Box className='text-center'>
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
          <Button type="submit"  variant="gradient" fullWidth sx={{ mt: 2, background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            color:'#ffffff',
             '&.Mui-disabled': {
              color: '#ffffff',
             }
          }}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"} 
          </Button>
        </form>
      </Box>
      <style>
               {`
               /* Default label color */
       .MuiInputLabel-root {
         color: #ccc !important;
       }
       
       /* Autofill label color */
       input:-webkit-autofill {
         box-shadow: 0 0 0 100px #23272b inset !important; /* optional: background fix */
         -webkit-text-fill-color: #fff !important;         /* optional: input text color */
         
       }
       .css-voecp4-MuiInputBase-input-MuiFilledInput-input:-webkit-autofill{
       border-top-left-radius:0 !important;
         border-top-right-radius:0 !important;
       }
       /* Target label when autofill is active */
       input:-webkit-autofill ~ .MuiInputLabel-root,
       input:-webkit-autofill + .MuiInputLabel-root {
         color: #000 !important;
       }`}
      </style>
    </Box>
  );
}

export default Login;