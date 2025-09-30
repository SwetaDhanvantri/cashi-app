import React from 'react'
import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
        color: "#fff",
        display:"flex",
        justifyContent:"space-around",
        py: 1,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} <Link to="/dashboard" style={{textDecoration:'none', color:'#fff'}}>Cashi.</Link> All rights reserved.
      </Typography>
      <Link to="https://cashi.in/" style={{textDecoration:'none', color:'#fff'}} target='_blank'>
      <Typography variant="link">www.cashi.in</Typography></Link>
    </Box>
    </>
  )
}
