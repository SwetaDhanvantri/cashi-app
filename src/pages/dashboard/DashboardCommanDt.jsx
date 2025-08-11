// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Box, Button, Container, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function DashboardCommanDt({ title, columns, rows }) {
//   const navigate = useNavigate();
//   return (
//     <Box  my={2}>
//         <Container>
//           <Typography sx={{display:'flex', justifyContent:'end'}}>
//            <Button variant="contained" sx={{backgroundColor:'#000000', color:'#ffffff'}} onClick={()=> navigate('/dashboard')}>Back</Button>
//           </Typography>
//         <Typography variant="h4" gutterBottom>{title}</Typography>
//         <Box sx={{ height: 500, width: '100%' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5, 10]}
//           />
//         </Box>

    
//       </Container>
//       </Box>
//   )
// }


import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext,useGridSelector,} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: '#1d1d1d',
    ...theme.applyStyles('light', {
      backgroundColor: '#fafafa',
    }),
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderRightColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderBottomColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255,255,255,0.65)',
    ...theme.applyStyles('light', {
      color: 'rgba(0,0,0,.85)',
    }),
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...theme.applyStyles('light', {
    color: 'rgba(0,0,0,.85)',
  }),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

export default function DashboardCommanDt({ title, columns, rows }) {
  
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <Container>
       <Typography className='my-4' sx={{display:'flex', justifyContent:'end'}}>
           <Button variant="contained" sx={{backgroundColor:'#000000', color:'#ffffff'}} onClick={()=> navigate('/dashboard')}>Back</Button>
          </Typography>
        <div style={{ height: 400, width: '100%' }}>
      <StyledDataGrid
       rows={rows}
       columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        slots={{
          pagination: CustomPagination,
        }}
      />
    </div>
    </Container>
  
  );
}
