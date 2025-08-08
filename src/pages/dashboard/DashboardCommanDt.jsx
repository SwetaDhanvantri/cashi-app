import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardCommanDt({ title, columns, rows }) {
  const navigate = useNavigate();
  return (
    <Box  my={2}>
        <Container>
          <Typography sx={{display:'flex', justifyContent:'end'}}>
           <Button variant="contained" sx={{backgroundColor:'#000000', color:'#ffffff'}} onClick={()=> navigate('/dashboard')}>Back</Button>
          </Typography>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>

    
      </Container>
      </Box>
  )
}
