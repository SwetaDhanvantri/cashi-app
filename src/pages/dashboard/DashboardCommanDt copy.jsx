import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Container,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  fontFamily: 'Roboto, sans-serif',
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#1d1d1d',
    color: '#000',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #303030',
    color: '#000',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
   
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
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
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

//staus

const PAGE_SIZE = 5;

export default function DashboardCommanDt({ title, columns, rows }) {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <Container>
      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
          p: 1,
          color: '#ffffff',
          borderRadius: '4px',
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>{toolbar}</Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() => navigate('/dashboard')}
        >
          Back
        </Button>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 'auto', maxHeight:500, width: '100%' }}>
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
      </Box>
    </Container>
  );
}
